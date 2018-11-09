export default namespace => {
  let counter;
  counter = 0;
  return () => `${namespace}-${counter++}`;
};
