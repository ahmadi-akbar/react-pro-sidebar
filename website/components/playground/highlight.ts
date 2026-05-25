/**
 * Tiny single-pass JSX tokenizer. Returns an array of tokens that the caller
 * renders as React nodes. No HTML strings, no `dangerouslySetInnerHTML` — React
 * escapes the text content of each `<span>` automatically.
 */

export type TokenType =
  | 'kw' // keyword
  | 'str' // string literal
  | 'tag' // JSX tag name
  | 'attr' // JSX attribute name
  | 'com' // comment
  | 'num' // number
  | 'bool' // true / false / null / undefined
  | 'text'; // anything else (default text)

export interface Token {
  type: TokenType;
  text: string;
}

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

/** Pushes a token, merging consecutive `text` tokens to keep the array short. */
const push = (out: Token[], type: TokenType, text: string) => {
  if (!text) return;
  const last = out[out.length - 1];
  if (last && last.type === 'text' && type === 'text') {
    last.text += text;
  } else {
    out.push({ type, text });
  }
};

export function tokenize(code: string): Token[] {
  const out: Token[] = [];
  const n = code.length;
  let i = 0;
  let inJsxTag = false;

  while (i < n) {
    const ch = code[i];

    // Single-line comment
    if (ch === '/' && code[i + 1] === '/') {
      let j = i;
      while (j < n && code[j] !== '\n') j++;
      push(out, 'com', code.slice(i, j));
      i = j;
      continue;
    }

    // Block comment
    if (ch === '/' && code[i + 1] === '*') {
      let j = i + 2;
      while (j < n - 1 && !(code[j] === '*' && code[j + 1] === '/')) j++;
      j = Math.min(j + 2, n);
      push(out, 'com', code.slice(i, j));
      i = j;
      continue;
    }

    // String literal (single or double quoted, with escapes)
    if (ch === "'" || ch === '"') {
      const quote = ch;
      let j = i + 1;
      while (j < n && code[j] !== quote) {
        if (code[j] === '\\') j++;
        j++;
      }
      j = Math.min(j + 1, n);
      push(out, 'str', code.slice(i, j));
      i = j;
      continue;
    }

    // JSX opening / closing tag: <Tag, </Tag
    if (ch === '<') {
      const next = code[i + 1] || '';
      if (/[A-Za-z]/.test(next) || next === '/') {
        push(out, 'text', '<');
        i++;
        if (code[i] === '/') {
          push(out, 'text', '/');
          i++;
        }
        let j = i;
        while (j < n && /[A-Za-z0-9_.]/.test(code[j])) j++;
        const name = code.slice(i, j);
        if (name) push(out, 'tag', name);
        i = j;
        inJsxTag = true;
        continue;
      }
    }

    // JSX `/>` self-close
    if (inJsxTag && ch === '/' && code[i + 1] === '>') {
      push(out, 'text', '/>');
      i += 2;
      inJsxTag = false;
      continue;
    }

    // JSX `>` close
    if (inJsxTag && ch === '>') {
      push(out, 'text', '>');
      i++;
      inJsxTag = false;
      continue;
    }

    // Identifier / keyword / boolean / JSX attribute
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);

      if (KEYWORDS.has(word)) {
        push(out, 'kw', word);
      } else if (BOOLEANS.has(word)) {
        push(out, 'bool', word);
      } else if (inJsxTag) {
        push(out, 'attr', word);
      } else {
        push(out, 'text', word);
      }
      i = j;
      continue;
    }

    // Number
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < n && /[0-9.]/.test(code[j])) j++;
      push(out, 'num', code.slice(i, j));
      i = j;
      continue;
    }

    // Whitespace / punctuation / everything else
    push(out, 'text', ch);
    i++;
  }

  return out;
}
