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

const url = new URL(window.location);
const search = url.searchParams.get("search");

if (search) showOnlyMatches(search);
