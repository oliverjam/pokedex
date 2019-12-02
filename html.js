function html(strings, ...interpolations) {
  return strings
    .map((string, i) => {
      let value = interpolations[i];
      // 0 is falsy but a valid value
      if (value === undefined || value === null || value === false) {
        value = "";
      }
      // join arrays so they aren't stringified with commas
      if (Array.isArray(value)) {
        value = value.join("");
      }
      return string + value;
    })
    .join("");
}

module.exports = html;
