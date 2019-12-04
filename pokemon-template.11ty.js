const html = require("./html");

exports.data = {
  layout: "layouts/base",
  permalink: data => `/pokemon/${data.pokemon.name}/index.html`,
  pagination: {
    data: "allPokemon",
    size: 1,
    alias: "pokemon",
  },
};

exports.render = data => {
  const {
    id,
    name,
    sprite,
    weight,
    height,
    types,
    abilities,
    stats,
    moves,
  } = data.pokemon;
  if (!moves["level-up"]["ultra-sun-ultra-moon"]) console.warn(name);
  return html`
    <div>
      <section class="stack">
        <div class="cluster">
          <header>
            <h1>${name}</h1>
            <span class="pill">#${id}</span>
          </header>
        </div>
        <img src="${sprite}" alt="" />
      </section>

      <section>
        <h2 class="vh">Types</h2>
        <div class="cluster">
          <ul>
            ${types.map(Type)}
          </ul>
        </div>
      </section>
    </div>

    <section class="stack">
      <h2>Abilities</h2>
      <ul class="stack">
        ${abilities.map(Ability)}
      </ul>
    </section>

    <section class="stack">
      <h2>Stats</h2>
      ${Stats(stats)}
    </section>

    <section class="stack">
      <h2>Moves</h2>

      <div>
        <h3>By level-up</h3>
        ${Moves({ moves, type: "level-up", game: "ultra-sun-ultra-moon" })}
      </div>

      <details>
        <summary>
          <h3 style="display: inline;">By machine</h3>
        </summary>
        ${Moves({ moves, type: "machine", game: "ultra-sun-ultra-moon" })}
      </details>
    </section>
    <style>
      :root {
        --primary: var(--${types[0].name});
        ${types[1] && `--secondary: var(--${types[1].name})`};
      }
      body {
        font-size: 1.25rem;
      }
    </style>
  `;
};

function Type(t) {
  return html`
    <li class="pill" style="--bg: var(--${t.name}-light)">${t.name}</li>
  `;
}

function Ability({ name, hidden, short_effect, effect }) {
  return html`
    <li class="stack2">
      <h3>
        ${name.replace("-", " ")}${hidden && " (hidden)"}
      </h3>
      ${short_effect === effect ? html`<p>
          ${effect}
        </p>` : html`
      <details>
        <summary>${short_effect}</summary>
        <p>
          ${effect}
        </p>
      </details>`}
    </li>
  `;
}

function Moves({ moves, type, game }) {
  const movesByType = moves[type];
  if (!movesByType) return null;
  const movesByGame = movesByType[game];
  if (!movesByGame) return null;
  return html`
    <table>
      <thead>
        <tr>
          <td>lvl</td>
          <td>Move</td>
        </tr>
      </thead>
      <tbody>
        ${movesByGame.map(
          m => html`
            <tr>
              <td class="right">${m.level}</td>
              <td>${m.name}</td>
            </tr>
          `
        )}
      </tbody>
    </table>
  `;
}

function Stats(stats) {
  return html`
    <table>
      <thead class="vh">
        <tr>
          <td>Stat</td>
          <td>Base</td>
          <td>Proportion of max</td>
        </tr>
      </thead>
      <tbody>
        ${stats.map(
          s => html`
    <tr>
				<th scope="row">${formatName(s.name)}</th>
				<td>${s.base}</td>
        <td><progress max="255" value="${s.base}">
        </td>
			</tr>
    `
        )}
      </tbody>
    </table>
  `;
}

function formatName(name) {
  return {
    speed: "Spe",
    attack: "Atk",
    defense: "Def",
    "special-attack": "SpA",
    "special-defense": "SpD",
    hp: "HP",
  }[name];
}
