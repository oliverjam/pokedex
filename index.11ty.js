const html = require("./html");

exports.data = {
  layout: "layouts/base",
};

exports.render = data => {
  return html`
    <h1>Pokedex</h1>
    <ol>
      ${data.allPokemon.map(Pokemon)}
    </ol>
  `;
};

function Pokemon(p) {
  return html`
    <li class="row box poke-link">
        <img src="${p.sprite}" alt="" width="64" height="64" loading="lazy" />
        <a href="/pokemon/${p.name}" style="text-transform: capitalize;">${
    p.name
  }</a>
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
      ${t.name.slice(0, 1)}
    </li>
  `;
}
