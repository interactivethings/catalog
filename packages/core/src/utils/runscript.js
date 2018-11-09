import { isEmpty, is } from "ramda";

//
// Sequentially runs scripts as they are added
//

let current = null;
let queue = [];
let dequeue = handler => {
  current = handler();
  current.then(() => {
    current = null;
    if (queue.length > 0) {
      return dequeue(queue.shift());
    }
    return void 0;
  });
  return current.catch(() => {
    throw new Error("Error loading script");
  });
};
let enqueue = handler => {
  if (current !== null) {
    return queue.push(handler);
  }
  return dequeue(handler);
};
let execScript = decorate => {
  let script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  decorate(script);
  let head =
    document.getElementsByTagName("head")[0] || document.documentElement;
  return head.appendChild(script);
};
let execRemote = src => {
  return () => {
    return new Promise((resolve, reject) => {
      return execScript(script => {
        script.addEventListener("load", resolve, false);
        script.addEventListener("error", reject, false);
        return script.setAttribute("src", src);
      });
    });
  };
};
let execInline = src => {
  return () => {
    return new Promise(resolve => {
      return execScript(script => {
        script.appendChild(document.createTextNode(src));
        return resolve();
      });
    });
  };
};

export default srcOrEl => {
  if (is(String, srcOrEl) && !isEmpty(srcOrEl.trim())) {
    enqueue(execRemote(srcOrEl));
  }
  if (srcOrEl.textContent && !isEmpty(srcOrEl.textContent.trim())) {
    return enqueue(execInline(srcOrEl.textContent));
  }
  return void 0;
};
