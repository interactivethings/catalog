var marked = require('marked');
var React = require('react');

function extend(o1, o2) {
  Object.keys(o2).forEach(function (key) {
    o1[key] = o2[key];
  });
}

var itemsRenderedCount = 0;

function ReactRenderer() {}

extend(ReactRenderer.prototype, {
  code: function (code, lang, escaped) {
    var className = this.props && this.props.langPrefix;
    return React.DOM.pre( {key:itemsRenderedCount++}, React.DOM.code( {className:className}, code))
  },
  blockquote: function(quote) {
    return React.DOM.blockquote( {key:itemsRenderedCount++}, quote)
  },
  heading: function (text, level, raw) {
    return React.DOM['h' + level]({ key: itemsRenderedCount++, id: raw.toLowerCase().replace(/[^\w]+/g, '-') }, text)
  },
  hr: function () {
    return React.DOM.hr( {key:itemsRenderedCount++} );
  },
  br: function () {
    return React.DOM.br( {key:itemsRenderedCount++} );
  },
  list: function (body, ordered) {
    if (ordered) {
      return React.DOM.ol( {key:itemsRenderedCount++}, body);
    }
    return React.DOM.ul( {key:itemsRenderedCount++}, body);
  },
  listitem: function (text) {
    return React.DOM.li( {key:itemsRenderedCount++}, text);
  },
  paragraph: function (text) {
    return React.DOM.p( {key:itemsRenderedCount++}, text);
  },
  table: function (header, body) {
    return (
      React.DOM.table( {key:itemsRenderedCount++}, 
        React.DOM.thead(null, header),
        React.DOM.tbody(null, body)
      )
    );
  },
  tablerow: function (content) {
    return React.DOM.tr( {key:itemsRenderedCount++}, content);
  },
  strong: function (content) {
    return React.DOM.strong( {key:itemsRenderedCount++}, content);
  },
  em: function (content) {
    return React.DOM.em( {key:itemsRenderedCount++}, content);
  },
  codespan: function (content) {
    return React.DOM.code( {key:itemsRenderedCount++}, content);
  },
  del: function (content) {
    return React.DOM.del( {key:itemsRenderedCount++}, content);
  },
  link: function(href, title, text) {
    return React.DOM.a( {href:href, title:title, key:itemsRenderedCount++}, text);
  },
  image: function(href, title, text) {
    function done(e) { e.preventDefault(); console.log(itemsRenderedCount); return false; }
    if (!href) {
      return React.DOM.img( {src:href, title:title, alt:text, key:itemsRenderedCount++, onDrop:done} );
    }
    return React.DOM.img( {src:href, title:title, alt:text, key:itemsRenderedCount++} );
  },
  html: function (html) {
    return React.DOM.div( {dangerouslySetInnerHTML:{__html: html.join('') }, key:itemsRenderedCount++} );
  }
});

function ReactParser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || {};
  this.options.renderer = this.options.renderer || new ReactRenderer();
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

ReactParser.parse = function(src, options) {
  var parser = new ReactParser(options);
  return parser.parse(src);
};

extend(ReactParser.prototype, {
  parse: function (src) {
    var out = [],
    i = 0,
    next;
    this.inline = new ReactInlineLexer(src.links, this.options, this.renderer);
    this.tokens = src.reverse();

    while (this.next()) {
      out.push(this.tok());
    }

    return out;//React.DOM.div(null, out);
  },
  next: function () {
    return this.token = this.tokens.pop();
  },
  peek: function () {
    return this.tokens[this.tokens.length - 1] || 0;
  },
  parseText: function () {
    var body = this.token.text;
    while (this.peek().type === 'text') {
      body += '\n' + this.next().text;
    }
    return this.inline.output(body);
  },
  tok: function () {
    switch (this.token.type) {
      case 'space': {
        return '';
      }
      case 'hr': {
        return this.renderer.hr();
      }
      case 'heading': {
        return this.renderer.heading(
          this.inline.output(this.token.text),
          this.token.depth,
          this.token.text);
      }
      case 'code': {
        return this.renderer.code(this.token.text,
                                  this.token.lang,
                                  this.token.escaped);
      }
      case 'table': {
        var header = [],
        body = [],
        i, row, cell, flags, j;

        // header
        cell = [];
        for (i = 0; i < this.token.header.length; i++) {
          flags = { header: true, align: this.token.align[i] };
          cell.push(this.renderer.tablecell(
            this.inline.output(this.token.header[i]),
            { header: true, align: this.token.align[i] }
          ));
        }
        header.push(this.renderer.tablerow(cell));

        for (i = 0; i < this.token.cells.length; i++) {
          row = this.token.cells[i];

          cell = [];
          for (j = 0; j < row.length; j++) {
            cell.push(this.renderer.tablecell(
              this.inline.output(row[j]),
              { header: false, align: this.token.align[j] }
            ));
          }

          body.push(this.renderer.tablerow(cell));
        }
        return this.renderer.table(header, body);
      }
      case 'blockquote_start': {
        var body = [];

        while (this.next().type !== 'blockquote_end') {
          body.push(this.tok());
        }

        return this.renderer.blockquote(body);
      }
      case 'list_start': {
        var body = []
          , ordered = this.token.ordered;

        while (this.next().type !== 'list_end') {
          body.push(this.tok());
        }

        return this.renderer.list(body, ordered);
      }
      case 'list_item_start': {
        var body = [];

        while (this.next().type !== 'list_item_end') {
          body.push(this.token.type === 'text'
            ? this.parseText()
            : this.tok());
        }

        return this.renderer.listitem(body);
      }
      case 'loose_item_start': {
        var body = [];

        while (this.next().type !== 'list_item_end') {
          body.push(this.tok());
        }

        return this.renderer.listitem(body);
      }
      case 'html': {
        var html = !this.token.pre && !this.options.pedantic
          ? this.inline.output(this.token.text)
          : this.token.text;
          return this.renderer.html(html);
      }
      case 'paragraph': {
        return this.renderer.paragraph(this.inline.output(this.token.text));
      }
      case 'text': {
        return this.renderer.paragraph(this.parseText());
      }
    }

  }
});

var ReactInlineLexer = marked.InlineLexer.prototype.constructor

ReactInlineLexer.prototype = Object.create(marked.InlineLexer.prototype);

ReactInlineLexer.prototype.output = function(src) {
  var out = [],
  link, text, href, cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out.push(cap[1]);
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
          href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out.push(this.renderer.link(href, null, text));
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out.push(this.renderer.link(href, null, text));
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out.push(this.options.sanitize
        ? escape(cap[0])
        : cap[0]);
        continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out.push(this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      }));
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
      || (cap = this.rules.nolink.exec(src))) {
        src = src.substring(cap[0].length);
        link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
        link = this.links[link.toLowerCase()];
        if (!link || !link.href) {
          out.push(cap[0].charAt(0));
          src = cap[0].substring(1) + src;
          continue;
        }
        this.inLink = true;
        out.push(this.outputLink(cap, link));
        this.inLink = false;
        continue;
      }

      // strong
      if (cap = this.rules.strong.exec(src)) {
        src = src.substring(cap[0].length);
        out.push(this.renderer.strong(this.output(cap[2] || cap[1])));
        continue;
      }

      // em
      if (cap = this.rules.em.exec(src)) {
        src = src.substring(cap[0].length);
        out.push(this.renderer.em(this.output(cap[2] || cap[1])));
        continue;
      }

      // code
      if (cap = this.rules.code.exec(src)) {
        src = src.substring(cap[0].length);
        out.push(this.renderer.codespan(escape(cap[2], true)));
        continue;
      }

      // br
      if (cap = this.rules.br.exec(src)) {
        src = src.substring(cap[0].length);
        out.push(this.renderer.br());
        continue;
      }

      // del (gfm)
      if (cap = this.rules.del.exec(src)) {
        src = src.substring(cap[0].length);
        out.push(this.renderer.del(this.output(cap[1])));
        continue;
      }

      // text
      if (cap = this.rules.text.exec(src)) {
        src = src.substring(cap[0].length);
        out.push(escape(this.smartypants(cap[0])));
        continue;
      }

      if (src) {
        throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
      }
  }

  return out;
};

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
 return html.replace(/&([#\w]+);/g, function(_, n) {
   n = n.toLowerCase();
   if (n === 'colon') return ':';
   if (n.charAt(0) === '#') {
     return n.charAt(1) === 'x'
       ? String.fromCharCode(parseInt(n.substring(2), 16))
       : String.fromCharCode(+n.substring(1));
   }
   return '';
 });
}


var Marked = function(src, opt, callback) {
  return ReactParser.parse(marked.lexer(src), opt);
}



Marked.Renderer = ReactRenderer

module.exports = Marked;
