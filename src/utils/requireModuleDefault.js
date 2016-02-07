// A little helper to require babel-transformed modules with default export
export default (module) => module.__esModule ? module.default : module;
