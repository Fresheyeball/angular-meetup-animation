var TimelineLiteMock, TweenLiteMock, addFlush, addNoPending, addRefMethods, construct, pushAndPass, pushAndPassTimelineLite, pushAndPassTweenLite, tmpTimelineLite, tmpTweenLite, _i, _j, _len, _len1, _ref, _ref1,
  __slice = [].slice;

pushAndPass = function(mock, mocked) {
  return function(name) {
    return mock[name] = function() {
      var args, tl;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      tl = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(mocked[name], args, function(){});
      mock.refs.push(tl);
      return tl;
    };
  };
};

addNoPending = function(mock, humanName) {
  return mock.verifyNoPending = function() {
    if (mock.refs.length > 0) {
      throw new Error("VERIFY : " + mock.refs.length + " " + humanName + "s found");
    } else {
      return true;
    }
  };
};

addFlush = function(mock, humanName) {
  return mock.flush = function() {
    var ref, _i, _len, _ref;
    if (mock.refs.length === 0) {
      throw new Error("FLUSH : no " + humanName + " found");
    } else {
      _ref = mock.refs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ref = _ref[_i];
        ref.totalProgress(1);
      }
    }
    return true;
  };
};

addRefMethods = function() {
  var args;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  addNoPending.apply(null, args);
  return addFlush.apply(null, args);
};

tmpTweenLite = window.TweenLite;

TweenLiteMock = {
  refs: []
};

pushAndPassTweenLite = pushAndPass(TweenLiteMock, tmpTweenLite);

_ref = ['to', 'from', 'fromTo'];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  construct = _ref[_i];
  pushAndPassTweenLite(construct);
}

addRefMethods(TweenLiteMock, 'tween');

window.TweenLite = TweenLiteMock;

window.TweenLite.set = tmpTweenLite.set;

sinon.spy(window.TweenLite, 'set');

tmpTimelineLite = window.TimelineLite;

TimelineLiteMock = function() {
  var args, tl;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  tl = (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(tmpTimelineLite, args, function(){});
  TimelineLiteMock.refs.push(tl);
  return tl;
};

TimelineLiteMock.refs = [];

pushAndPassTimelineLite = pushAndPass(TimelineLiteMock, tmpTimelineLite);

_ref1 = ['to', 'from', 'fromTo'];
for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
  construct = _ref1[_j];
  pushAndPassTimelineLite(construct);
}

addRefMethods(TimelineLiteMock, 'timeline');

window.TimelineLite = TimelineLiteMock;

window.GSAPflush = function() {
  TweenLiteMock.flush();
  return TimelineLite.flush();
};