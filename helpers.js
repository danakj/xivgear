function ElementFromId(name) {
  return document.getElementById(name);
}

function MaybeZero(m) {
  return m ? m : 0;
}

function MaybeEmpty(m) {
  return m ? m : "";
}

function curry (fn, scope) {
  var scope = scope || window;
  var args = [];
  for (var i=2, len = arguments.length; i < len; ++i) {
    args.push(arguments[i]);
  };
  return function() {
    fn.apply(scope, args);
  };
}
