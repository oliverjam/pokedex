const html = require("../../html");
const css = String.raw;

exports.render = data => {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="/assets/style.css" />
      </head>
      <body>
        <header class="site-header">
          <a href="/" aria-label="Home">
            <svg
              viewBox="0 0 32 32"
              width="48"
              height="48"
              stroke="none"
              aria-hidden="true"
            >
              <path d="M2,16 a 6 6 0 0 1 28 0 Z" fill="var(--primary)" />
              <path
                id="pokeball-secondary"
                d="M2,16 a 6 6 0 0 0 28 0 Z"
                fill="var(--secondary)"
              />
              <path d="M2,16 a 6 6 0 0 0 28 0 Z" fill="white" />
              <line x1="2" y1="16" x2="30" y2="16" stroke="black" />
              <circle
                cx="16"
                cy="16"
                r="5"
                fill="var(--grey5)"
                stroke="black"
              />
              <circle cx="16" cy="16" r="3" fill="white" stroke="black" />
              <circle cx="16" cy="16" r="14" fill="none" stroke="black" />
            </svg>
          </a>
        </header>
        <main class="stack4">
          ${data.content}
        </main>
      </body>
    </html>
  `;
};
