const htmlmin = require("html-minifier");

module.exports = config => {
  config.addPassthroughCopy({ "_includes/assets/js": "assets/js" });
  config.addPassthroughCopy({ "_includes/assets/css": "assets/css" });
  config.addPassthroughCopy({ "_includes/assets/media": "assets/media" });
  config.addPassthroughCopy({
    "_includes/assets/service-worker.js": "service-worker.js",
  });

  config.addTransform("htmlmin", function(content, outputPath) {
    if (process.env.ELEVENTY_ENV === "production") {
      if (outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        });
        return minified;
      }
    }
    return content;
  });
};
