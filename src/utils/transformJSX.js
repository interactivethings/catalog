import React from "react";
import { transform } from "babel-standalone";
import requireModuleDefault from "./requireModuleDefault";

const presets = ["es2015-loose", "react", "stage-2"];

// Babel plugin to return last top-level expression statement
const returnLastExpressionPlugin = ({ types: t }) => ({
  visitor: {
    // We only care about top-level expressions
    Program(path) {
      // Find the last expression statement
      let lastExpr;
      for (let i = path.node.body.length - 1; i >= 0; i--) {
        if (t.isExpressionStatement(path.node.body[i])) {
          lastExpr = path.get(`body.${i}`);
          break;
        }
      }

      if (lastExpr) {
        // ... and turn it into a return statement
        lastExpr.replaceWith(t.returnStatement(lastExpr.node.expression));
      }
    }
  }
});

let cached = {};
const cachedTransform = jsx => {
  if (cached[jsx]) {
    return cached[jsx];
  }
  const transformed = transform(jsx, {
    compact: true,
    presets,
    plugins: [returnLastExpressionPlugin]
  }).code;
  cached[jsx] = transformed;
  return transformed;
};

const missingTransformError = {
  error:
    "Please include [babel-standalone](https://github.com/babel/babel-standalone) before Catalog."
};

export default (jsx, imports) => {
  // Check for transform to provide a better error message
  try {
    transform;
  } catch (error) {
    return missingTransformError;
  }

  try {
    const importKeys = Object.keys(imports).filter(k => imports[k]);
    const importModules = importKeys.map(k => requireModuleDefault(imports[k]));
    const code = cachedTransform(jsx);
    // eslint-disable-next-line no-new-func
    const element = new Function("React", ...importKeys, code)(
      React,
      ...importModules
    );
    return { code, element };
  } catch (error) {
    return { error };
  }
};
