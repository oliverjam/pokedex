const pokes = document.querySelectorAll(".poke-link");

const cache = href => () => caches.open("dex-0").then(c => c.add(href));

pokes.forEach(p => {
  const link = p.querySelector("a[href*='/pokemon/'");
  const { href } = link;

  const button = document.createElement("button");
  button.setAttribute("aria-label", "download");
  button.innerHTML = `<img src="/assets/download.svg" alt="" />`;
  button.addEventListener("click", cache(href));

  p.appendChild(button);
});
