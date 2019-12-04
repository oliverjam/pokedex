const html = require("./html");

exports.data = {
  layout: "layouts/base",
};

exports.render = data => {
  return html`
    <h1>Pokedex</h1>
    <section class="stack" aria-label="search pokemon">
      <form>
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
    <section aria-label="pokemon">
      <ol class="grid">
        ${data.allPokemon.map(Pokemon)}
      </ol>
    </section>
    <script>
      const form = document.querySelector("form");
      form.addEventListener("submit", event => {
        event.preventDefault();
        const name = event.target.elements.search.value;
        showOnlyMatches(name);
      });

      document.querySelector("#clear").addEventListener("click", () => {
        showOnlyMatches("");
        form.reset();
      });

      const searchInput = document.querySelector("#search");
      const allPokemon = document.querySelectorAll(".poke-link");
      function showOnlyMatches(value) {
        let first;
        allPokemon.forEach(pokemon => {
          const name = pokemon.querySelector("h2").textContent;
          const match = name.includes(value);
          pokemon.hidden = !match;
          if (!first && match) first = pokemon;
        });
        if (value && first) {
          first.querySelector("a").focus();
        } else {
          searchInput.focus();
        }
      }
    </script>
  `;
};

function Pokemon(p) {
  return html`
    <li class="stack2 poke-link">
      <div class="box" style="--space: var(--space4); --bg: var(--grey1);">
        <div class="frame">
          <img src="${p.sprite}" alt="" width="64" height="64" loading="lazy" />
        </div>
      </div>
      <div class="stack2">
        <h2>
          <a href="/pokemon/${p.name}" style="text-transform: capitalize;"
            >${p.name}</a
          >
        </h2>
        <ul class="row2">
          ${p.types.map(Type)}
        </ul>
      </div>
    </li>
  `;
}

function Type(t) {
  return html`
    <li class="pill" style="--bg: var(--${t.name}-light); --size: var(--font0)">
      ${t.name}
    </li>
  `;
}
