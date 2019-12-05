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
  if (!moves["level-up"]) console.warn(name);
  return html`
    <div class="stack2">
      <section class="stack">
        <div class="cluster" style="--align: center">
          <header>
            <h1>${name}</h1>
            <span class="pill">#${id}</span>
          </header>
        </div>
        <img
          src="${sprite || "/assets/missing.svg"}"
          alt=""
          width="256"
          height="256"
          style="background-color: var(--grey1)"
        />
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

    <div class="cluster">
    <div>

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
        
      </div>
      </div>

      <section class="stack4">
        <h2>Moves</h2>

        <div class="cluster">
        <div>
        <details class="stack" open>
          <summary>
          <h3 style="display: inline;">By level-up</h3>
          </summary>
          ${Moves({
            moves,
            type: "level-up",
            game: "ultra-sun-ultra-moon",
            types: types.map(t => t.name),
          })}
        </details>

        <details class="stack">
          <summary>
            <h3 style="display: inline;">By machine</h3>
          </summary>
          ${Moves({
            moves,
            type: "machine",
            game: "ultra-sun-ultra-moon",
            types: types.map(t => t.name),
          })}
        </details>

        </div>
        </div>
      </section>
      <style>
        :root {
          --primary: var(--${types[0].name});
          --primary-light: var(--${types[0].name}-light);
          --primary-dark: var(--${types[0].name}-dark);
          ${types[1] && `--secondary: var(--${types[1].name})`};
        }
      </style>
    </div>
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
        ${name}${hidden && " (hidden)"}
      </h3>
      ${short_effect === effect
        ? html`
            <p>
              ${effect}
            </p>
          `
        : html`
            <details>
              <summary>${short_effect}</summary>
              <p>
                ${effect}
              </p>
            </details>
          `}
    </li>
  `;
}

function Moves({ moves, type, game, types }) {
  const movesByType = moves[type];
  if (!movesByType) return null;
  const movesByGame = movesByType[game];
  if (!movesByGame) return null;
  return html`
    <table class="table">
      <thead class="vh">
        <tr>
          ${type === "level-up" &&
            html`
              <td>lvl</td>
            `}
          <td>Move</td>
          <td>Type</td>
          <td aria-label="category">Cat</td>
          <td>Power</td>
          <td aria-label="accuracy">Acc</td>
        </tr>
      </thead>
      <tbody>
        ${movesByGame.map(m => {
          const stab = types.includes(m.type) && m.power;
          return html`
            <tr>
              ${type === "level-up" &&
                html`
                  <td class="right">${m.level}</td>
                `}
              <td class="move" style="font-weight: ${stab ? "bold" : "normal"}">
                ${m.name}
              </td>
              <td
                style="background-color: var(--${m.type}-light); font-size: var(--font2); text-align: center;"
              >
                ${m.type}
              </td>
              <td>${m.damage_class.slice(0, 2)}</td>
              <td class="right">${m.power}</td>
              <td class="right">${m.accuracy}${m.accuracy && "%"}</td>
            </tr>
          `;
        })}
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
              <td><progress max="255" value="${s.base}"></progress></td>
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
