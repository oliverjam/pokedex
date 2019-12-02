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
        <main class="stack4">
          ${data.content}
        </main>
      </body>
    </html>
  `;
};
