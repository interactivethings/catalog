let warning = () => {};

if (process.env.NODE_ENV !== "production") {
  // Logs an error if condition is _not_ met.
  warning = (condition, message, ...args) => {
    if (condition) {
      return;
    }

    if (typeof console !== "undefined") {
      console.error(`Catalog warning: ${message}`, ...args); // eslint-disable-line no-console
    }
  };
}

export default warning;
