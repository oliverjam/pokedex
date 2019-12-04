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
        <link rel="stylesheet" href="/assets/global.css" />
        ${data.page.url.includes("/pokemon") &&
          html`
            <link rel="stylesheet" href="/assets/pokemon.css" />
          `}
      </head>
      <body>
        <header class="row-between site-header">
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
          <section class="stack" aria-label="search pokemon">
            <form action="/">
              <label for="search" class="vh">Search</label>
              <div class="search">
                <input
                  id="search"
                  name="search"
                  type="search"
                  autocomplete="off"
                  autofocus
                  placeholder="e.g. Charizard"
                />
                <button id="clear" type="button" aria-label="clear search">
                  <svg
                    viewBox="0 0 32 32"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentcolor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    style="transform: scaleX(-1)"
                  >
                    <path
                      d="M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2"
                    ></path>
                  </svg>
                </button>
                <button type="submit" aria-hidden="true" tabindex="-1">
                  <svg
                    viewBox="0 0 32 32"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentcolor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <circle cx="14" cy="14" r="12"></circle>
                    <path d="M23 23 L30 30"></path>
                  </svg>
                </button>
              </div>
            </form>
          </section>
        </header>
        <main class="stack4">
          ${data.content}
        </main>
        <footer class="row-between site-footer">
          <p>Made by <a href="https://oliverjam.es">@oliverjam</a></p>
          <a href="https://github.com/oliverjam/pokedex">
            <svg viewBox="0 0 64 64" width="24" height="24">
              <path
                stroke-width="0"
                fill="currentColor"
                d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z"
              ></path>
            </svg>
          </a>
        </footer>
      </body>
    </html>
  `;
};
