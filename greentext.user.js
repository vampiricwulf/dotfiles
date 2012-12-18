// ==UserScript==
// @name          greentext
// @namespace     noface
// @url           https://github.com/ihavenoface/dotfiles/raw/master/greentext.user.js
// @version       1.1
// @include       *://*
// @exclude       *4chan*
// @license       MIT License
// @description   implying
// ==/UserScript==

(function() {
  var cdm_listener, changeTextNodes, css, d, init, insertion_listener, replaceTextNode;

  d = document;

  css = '.implied { color: rgb(120, 153, 34) }';

  changeTextNodes = function(node) {
    var data, i, snapshot, _i, _ref;
    snapshot = d.evaluate('.//text()', node, null, 6, null);
    for (i = _i = 0, _ref = snapshot.snapshotLength; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      node = snapshot.snapshotItem(i);
      data = node.data;
      replaceTextNode(node, data);
    }
  };

  replaceTextNode = function(node, data) {
    var span;
    if (!(node.parentNode.className === 'implied') && /^>/.test(data.trim())) {
      span = d.createElement('span');
      span.className = 'implied';
      span.textContent = data;
      span.addEventListener('DOMCharacterDataModified', cdm_listener, false);
      return node.parentNode.replaceChild(span, node);
    }
  };

  insertion_listener = function(event) {
    var node;
    node = event.target;
    if (node.nodeType === 3) {
      return replaceTextNode(node, node.textContent);
    } else {
      return changeTextNodes(node);
    }
  };

  cdm_listener = function(event) {
    return event.target.parentNode.className = /^>/.test(event.newValue.trim()) ? 'implied' : 'unimplied';
  };

  init = function() {
    var style;
    style = d.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    d.head.appendChild(style, d.head);
    changeTextNodes(d.body);
    return d.body.addEventListener('DOMNodeInserted', insertion_listener, false);
  };

  init();

}).call(this);
