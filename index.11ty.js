const html = require("./html");

exports.data = {
  layout: "layouts/base",
};

exports.render = data => {
  return html`
    <h1>Pokedex</h1>
    <section aria-label="pokemon">
      <ol class="grid">
        ${data.allPokemon.map(Pokemon)}
      </ol>
    </section>
    <script async src="/assets/search.js"></script>
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
