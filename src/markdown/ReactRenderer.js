import React from 'react';
import Slugger from 'github-slugger';
import Link from '../components/Link/Link';
import Heading from '../components/Content/Heading';

export default class ReactRenderer {
  constructor() {
    this.slugger = new Slugger();
    this.itemsRenderedCount = 0;
  }
  getKey() {
    return this.itemsRenderedCount++;
  }
  code(code, lang /* , escaped*/) {
    return <pre key={this.getKey()}><code className={lang}>{code}</code></pre>;
  }
  blockquote(quote) {
    return <blockquote key={this.getKey()}>{quote}</blockquote>;
  }
  heading(text, level, raw) {
    const slug = this.slugger.slug(raw);
    return <Heading text={text} level={level} slug={slug} />;
  }
  hr() {
    return <hr key={this.getKey()} />;
  }
  br() {
    return <br key={this.getKey()} />;
  }
  list(body, ordered) {
    const key = this.getKey();
    return ordered
      ? <ol key={key}>{body}</ol>
      : <ul key={key}>{body}</ul>;
  }
  listitem(text) {
    return <li key={this.getKey()}>{text}</li>;
  }
  paragraph(text) {
    return <p key={this.getKey()}>{text}</p>;
  }
  table(header, body) {
    return (
      <table key={this.getKey()}>
        <thead>{header}</thead>
        <tbody>{body}</tbody>
      </table>
    );
  }
  tablerow(content) {
    return <tr key={this.getKey()}>{content}</tr>;
  }
  tablecell(content) {
    return <td key={this.getKey()}>{content}</td>;
  }
  strong(content) {
    return <strong key={this.getKey()}>{content}</strong>;
  }
  em(content) {
    return <em key={this.getKey()}>{content}</em>;
  }
  codespan(content) {
    return <code key={this.getKey()}>{content}</code>;
  }
  del(content) {
    return <del key={this.getKey()}>{content}</del>;
  }
  link(href, title, text) {
    return <Link to={href} title={title} key={this.getKey()}>{text}</Link>;
  }
  image(href, title, alt) {
    return <img src={href} title={title} alt={alt} key={this.getKey()} />;
  }
  html(html) {
    return <div dangerouslySetInnerHTML={{__html: html.join('')}} key={this.getKey()} />; // eslint-disable-line react/no-danger
  }
}
