import R from 'ramda';
//
// Sequentially runs scripts as they are added
//

module.exports = () => {
  let current = null;
  let queue = [];
  let enqueue = (handler) => {
    if (current != null) {
      return queue.push(handler);
    } else {
      return dequeue(handler);
    }
  };
  let dequeue = (handler) => {
    current = handler();
    current.then( () => {
      current = null;
      if (queue.length > 0) {
        return dequeue(queue.shift());
      }
    });
    return current["catch"]( () => {
      return console.error('Error loading script');
    });
  };
  let execRemote = (src) => {
    return () => {
      return new Promise( (resolve, reject) => {
        return execScript( (script) => {
          script.addEventListener('load', resolve, false);
          script.addEventListener('error', reject, false);
          return script.setAttribute('src', src);
        });
      });
    };
  };
  let execInline = (src) => {
    return () => {
      return new Promise( (resolve, reject) => {
        return execScript( (script) => {
          script.appendChild(document.createTextNode(src));
          return resolve();
        });
      });
    };
  };
  let execScript = (decorate) => {
    var head, script;
    script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    decorate(script);
    head = document.getElementsByTagName('head')[0] || document.documentElement;
    return head.appendChild(script);
  };
  return (srcOrEl) => {
    if (R.is(String, srcOrEl) && !R.isEmpty(srcOrEl.trim())) {
      enqueue(execRemote(srcOrEl));
    }
    if (srcOrEl.textContent && !R.isEmpty(srcOrEl.textContent.trim())) {
      return enqueue(execInline(srcOrEl.textContent));
    }
  };
};
