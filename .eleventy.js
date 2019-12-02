const htmlmin = require("html-minifier");

module.exports = config => {
  config.addPassthroughCopy({ "_includes/assets": "assets" });

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
