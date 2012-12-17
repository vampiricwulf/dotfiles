// ==UserScript==
// @name greentext
// @namespace Draceros
// @url https://gist.github.com/3202054
// @version 1.0
// @description implying
// @include *://*
// @exclude *4chan*
// @license MIT License
// ==/UserScript==

(function() {
  var cdm_listener, changeTextNodes, css, d, init, insertion_listener;

  d = document;

  css = ".implied { color: rgb(120, 153, 34) }";

  changeTextNodes = function(node) {
    var data, i, snapshot, span, _i, _ref;
    snapshot = d.evaluate('.//text()', node, null, 6, null);
    for (i = _i = 0, _ref = snapshot.snapshotLength; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      node = snapshot.snapshotItem(i);
      data = node.data;
      if (data.trim().substr(0, 1) === ">") {
        span = d.createElement("span");
        span.className = "implied";
        span.textContent = node.textContent;
        span.addEventListener("DOMCharacterDataModified", cdm_listener, false);
        node.parentNode.replaceChild(span, node);
      }
    }
  };

  insertion_listener = function(event) {
    return changeTextNodes(event.target);
  };

  cdm_listener = function(event) {
    return event.target.parentNode.className = event.newValue.trim().substr(0, 1) === ">" ? "implied" : "unimplied";
  };

  init = function() {
    var style;
    style = d.createElement("style");
    style.type = "text/css";
    style.textContent = css;
    d.head.appendChild(style, d.head);
    changeTextNodes(d.body);
    return d.body.addEventListener("DOMNodeInserted", insertion_listener, false);
  };

  init();

}).call(this);
