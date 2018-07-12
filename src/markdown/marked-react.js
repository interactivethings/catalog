import marked from "marked";

/* eslint-disable */

class ReactParser extends marked.Parser {
  static parse(src, options) {
    let parser = new ReactParser(options);
    return parser.parse(src);
  }

  parse(src) {
    this.inline = new ReactInlineLexer(src.links, this.options);
    // use an InlineLexer with a TextRenderer to extract pure text
    this.inlineText = new marked.InlineLexer(
      src.links,
      Object.assign({}, this.options, { renderer: new marked.TextRenderer() })
    );
    this.tokens = src.reverse();

    let out = [];
    while (this.next()) {
      out.push(this.tok());
    }

    return out;
  }

  tok() {
    switch (this.token.type) {
      case "space": {
        return "";
      }
      case "hr": {
        return this.renderer.hr();
      }
      case "heading": {
        return this.renderer.heading(
          this.inline.output(this.token.text),
          this.token.depth,
          unescape(this.inlineText.output(this.token.text))
        );
      }
      case "code": {
        return this.renderer.code(
          this.token.text,
          this.token.lang,
          this.token.escaped
        );
      }
      case "table": {
        var header = [],
          body = [],
          i,
          row,
          cell,
          j;

        // header
        cell = [];
        for (i = 0; i < this.token.header.length; i++) {
          cell.push(
            this.renderer.tablecell(this.inline.output(this.token.header[i]), {
              header: true,
              align: this.token.align[i]
            })
          );
        }
        header.push(this.renderer.tablerow(cell));

        for (i = 0; i < this.token.cells.length; i++) {
          row = this.token.cells[i];

          cell = [];
          for (j = 0; j < row.length; j++) {
            cell.push(
              this.renderer.tablecell(this.inline.output(row[j]), {
                header: false,
                align: this.token.align[j]
              })
            );
          }

          body.push(this.renderer.tablerow(cell));
        }
        return this.renderer.table(header, body);
      }
      case "blockquote_start": {
        body = [];

        while (this.next().type !== "blockquote_end") {
          body.push(this.tok());
        }

        return this.renderer.blockquote(body);
      }
      case "list_start": {
        body = [];
        var ordered = this.token.ordered,
          start = this.token.start;

        while (this.next().type !== "list_end") {
          body.push(this.tok());
        }

        return this.renderer.list(body, ordered, start);
      }
      case "list_item_start": {
        body = [];

        if (this.token.task) {
          body.push(this.renderer.checkbox(this.token.checked));
        }

        while (this.next().type !== "list_item_end") {
          body.push(this.token.type === "text" ? this.parseText() : this.tok());
        }

        return this.renderer.listitem(body);
      }
      case "loose_item_start": {
        body = [];

        while (this.next().type !== "list_item_end") {
          body.push(this.tok());
        }

        return this.renderer.listitem(body);
      }
      case "html": {
        // TODO parse inline content if parameter markdown=1
        return this.renderer.html(this.token.text);
      }
      case "paragraph": {
        return this.renderer.paragraph(this.inline.output(this.token.text));
      }
      case "text": {
        return this.renderer.paragraph(this.parseText());
      }
    }
  }
}

class ReactInlineLexer extends marked.InlineLexer {
  output(src) {
    let out = [],
      link,
      text,
      href,
      title,
      cap,
      prevCapZero;

    while (src) {
      // escape
      if ((cap = this.rules.escape.exec(src))) {
        src = src.substring(cap[0].length);
        out.push(cap[1]);
        continue;
      }

      // autolink
      if ((cap = this.rules.autolink.exec(src))) {
        src = src.substring(cap[0].length);
        if (cap[2] === "@") {
          text = escape(this.mangle(cap[1]));
          href = "mailto:" + text;
        } else {
          text = escape(cap[1]);
          href = text;
        }
        out.push(this.renderer.link(href, null, text));
        continue;
      }

      // url (gfm)
      if (!this.inLink && (cap = this.rules.url.exec(src))) {
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        src = src.substring(cap[0].length);
        if (cap[2] === "@") {
          text = escape(cap[0]);
          href = "mailto:" + text;
        } else {
          text = escape(cap[0]);
          if (cap[1] === "www.") {
            href = "http://" + text;
          } else {
            href = text;
          }
        }
        out.push(this.renderer.link(href, null, text));
        continue;
      }

      // tag
      if ((cap = this.rules.tag.exec(src))) {
        if (!this.inLink && /^<a /i.test(cap[0])) {
          this.inLink = true;
        } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
          this.inLink = false;
        }
        src = src.substring(cap[0].length);
        out.push(
          this.options.sanitize
            ? this.options.sanitizer
              ? this.options.sanitizer(cap[0])
              : escape(cap[0])
            : cap[0]
        );
        continue;
      }

      // link
      if ((cap = this.rules.link.exec(src))) {
        src = src.substring(cap[0].length);
        this.inLink = true;
        href = cap[2];
        if (this.options.pedantic) {
          link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

          if (link) {
            href = link[1];
            title = link[3];
          } else {
            title = "";
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : "";
        }
        href = href.trim().replace(/^<([\s\S]*)>$/, "$1");
        out.push(
          this.outputLink(cap, {
            href: ReactInlineLexer.escapes(href),
            title: ReactInlineLexer.escapes(title)
          })
        );
        this.inLink = false;
        continue;
      }

      // reflink, nolink
      if (
        (cap = this.rules.reflink.exec(src)) ||
        (cap = this.rules.nolink.exec(src))
      ) {
        src = src.substring(cap[0].length);
        link = (cap[2] || cap[1]).replace(/\s+/g, " ");
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
      if ((cap = this.rules.strong.exec(src))) {
        src = src.substring(cap[0].length);
        out.push(
          this.renderer.strong(
            this.output(cap[4] || cap[3] || cap[2] || cap[1])
          )
        );
        continue;
      }

      // em
      if ((cap = this.rules.em.exec(src))) {
        src = src.substring(cap[0].length);
        out.push(
          this.renderer.em(
            this.output(
              cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]
            )
          )
        );
        continue;
      }

      // code
      if ((cap = this.rules.code.exec(src))) {
        src = src.substring(cap[0].length);
        out.push(this.renderer.codespan(escape(cap[2].trim(), true)));
        continue;
      }

      // br
      if ((cap = this.rules.br.exec(src))) {
        src = src.substring(cap[0].length);
        out.push(this.renderer.br());
        continue;
      }

      // del (gfm)
      if ((cap = this.rules.del.exec(src))) {
        src = src.substring(cap[0].length);
        out.push(this.renderer.del(this.output(cap[1])));
        continue;
      }

      // text
      if ((cap = this.rules.text.exec(src))) {
        src = src.substring(cap[0].length);
        out.push(escape(this.smartypants(cap[0])));
        continue;
      }

      if (src) {
        throw new Error("Infinite loop on byte: " + src.charCodeAt(0));
      }
    }

    return out;
  }
}

function escape(html, encode) {
  return html;
}

const Marked = function(src, opt, callback) {
  return ReactParser.parse(marked.lexer(src), opt);
};

export default Marked;
