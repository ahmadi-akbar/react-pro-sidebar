/**
 * Tiny single-pass JSX tokenizer that returns HTML-with-spans for syntax
 * highlighting. Tuned for the snippets emitted by `generateCode` — handles
 * strings, comments, keywords, JSX tags, JSX attributes, numbers, and
 * booleans. Good enough for a playground preview without adding a 100kb
 * highlighter dependency.
 */

const KEYWORDS = new Set([
  'import',
  'from',
  'export',
  'default',
  'function',
  'const',
  'let',
  'var',
  'return',
  'if',
  'else',
  'type',
  'interface',
  'new',
  'class',
  'extends',
  'async',
  'await',
  'this',
]);

const BOOLEANS = new Set(['true', 'false', 'null', 'undefined']);

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const wrap = (cls: string, text: string) => `<span class="${cls}">${escapeHtml(text)}</span>`;

export function highlightJsx(code: string): string {
  const out: string[] = [];
  const n = code.length;
  let i = 0;
  let inJsxTag = false;

  while (i < n) {
    const ch = code[i];

    // Single-line comment
    if (ch === '/' && code[i + 1] === '/') {
      let j = i;
      while (j < n && code[j] !== '\n') j++;
      out.push(wrap('t-com', code.slice(i, j)));
      i = j;
      continue;
    }

    // Block comment
    if (ch === '/' && code[i + 1] === '*') {
      let j = i + 2;
      while (j < n - 1 && !(code[j] === '*' && code[j + 1] === '/')) j++;
      j = Math.min(j + 2, n);
      out.push(wrap('t-com', code.slice(i, j)));
      i = j;
      continue;
    }

    // String literal (single or double quote, with escapes)
    if (ch === "'" || ch === '"') {
      const quote = ch;
      let j = i + 1;
      while (j < n && code[j] !== quote) {
        if (code[j] === '\\') j++;
        j++;
      }
      j = Math.min(j + 1, n);
      out.push(wrap('t-str', code.slice(i, j)));
      i = j;
      continue;
    }

    // JSX opening or closing tag: <Tag, </Tag, or punctuation `<`
    if (ch === '<') {
      const next = code[i + 1] || '';
      if (/[A-Za-z]/.test(next) || next === '/') {
        out.push(escapeHtml('<'));
        i++;
        if (code[i] === '/') {
          out.push('/');
          i++;
        }
        let j = i;
        while (j < n && /[A-Za-z0-9_.]/.test(code[j])) j++;
        const name = code.slice(i, j);
        if (name) out.push(wrap('t-tag', name));
        i = j;
        inJsxTag = true;
        continue;
      }
    }

    // JSX self-close `/>` or close `>`
    if (inJsxTag && ch === '>') {
      out.push(escapeHtml('>'));
      i++;
      inJsxTag = false;
      continue;
    }
    if (inJsxTag && ch === '/' && code[i + 1] === '>') {
      out.push(escapeHtml('/>'));
      i += 2;
      inJsxTag = false;
      continue;
    }

    // Identifier / word
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);

      if (KEYWORDS.has(word)) {
        out.push(wrap('t-kw', word));
      } else if (BOOLEANS.has(word)) {
        out.push(wrap('t-bool', word));
      } else if (inJsxTag) {
        // JSX attribute (or boolean attribute right before `>` / whitespace)
        out.push(wrap('t-attr', word));
      } else {
        out.push(escapeHtml(word));
      }
      i = j;
      continue;
    }

    // Number
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < n && /[0-9.]/.test(code[j])) j++;
      out.push(wrap('t-num', code.slice(i, j)));
      i = j;
      continue;
    }

    out.push(escapeHtml(ch));
    i++;
  }

  return out.join('');
}
