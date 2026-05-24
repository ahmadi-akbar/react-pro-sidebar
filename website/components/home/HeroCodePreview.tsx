import React from 'react';

/**
 * Static, hydration-safe code preview used in the home hero.
 *
 * The code is built as a single HTML string and rendered via
 * `dangerouslySetInnerHTML`, which guarantees byte-identical output between
 * server SSR and client rehydration — no risk of MDX/JSX whitespace drift
 * inside `<pre>` (where whitespace is significant).
 */
const html =
  '<span class="tok-kw">import</span> { Sidebar, Menu, MenuItem, SubMenu } <span class="tok-kw">from</span> <span class="tok-str">\'react-pro-sidebar\'</span>;\n' +
  '<span class="tok-kw">import</span> { Diamond } <span class="tok-kw">from</span> <span class="tok-str">\'./icons\'</span>;\n\n' +
  '<span class="tok-kw">export default function</span> <span class="tok-fn">App</span>() {\n' +
  '  <span class="tok-kw">return</span> (\n' +
  '    &lt;<span class="tok-tag">Sidebar</span> <span class="tok-attr">collapsed</span>={collapsed}&gt;\n' +
  '      &lt;<span class="tok-tag">Menu</span>&gt;\n' +
  '        &lt;<span class="tok-tag">MenuItem</span> <span class="tok-attr">icon</span>={&lt;<span class="tok-tag">Diamond</span> /&gt;}&gt;\n' +
  '          Dashboard\n' +
  '        &lt;/<span class="tok-tag">MenuItem</span>&gt;\n' +
  '        &lt;<span class="tok-tag">SubMenu</span> <span class="tok-attr">label</span>=<span class="tok-str">"Charts"</span>&gt;\n' +
  '          &lt;<span class="tok-tag">MenuItem</span>&gt;Pie&lt;/<span class="tok-tag">MenuItem</span>&gt;\n' +
  '          &lt;<span class="tok-tag">MenuItem</span>&gt;Line&lt;/<span class="tok-tag">MenuItem</span>&gt;\n' +
  '        &lt;/<span class="tok-tag">SubMenu</span>&gt;\n' +
  '      &lt;/<span class="tok-tag">Menu</span>&gt;\n' +
  '    &lt;/<span class="tok-tag">Sidebar</span>&gt;\n' +
  '  );\n' +
  '}';

export default function HeroCodePreview() {
  return (
    <div className="rps-codeframe" aria-hidden="true">
      <div className="rps-codeframe-header">
        <span />
        <span />
        <span />
        <em>App.jsx</em>
      </div>
      <pre className="rps-codeframe-body">
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}
