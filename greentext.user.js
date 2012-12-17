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
  var TEXT_NODE, cdm_listener, changeTextNodes, d, green, init, insertion_listener, replaceTextContent, replacingContent;

  d = document;

  TEXT_NODE = Node.TEXT_NODE || 3;

  replacingContent = false;

  green = "rgb(120, 153, 34)";

  replaceTextContent = function(node) {
    var span;
    if (node.parentNode.getAttribute("contenteditable")) {
      return;
    }
    replacingContent = true;
    if (node.textContent.trim().substr(0, 1) === ">") {
      span = d.createElement("span");
      span.className = "implied";
      span.textContent = node.textContent;
      node.parentNode.replaceChild(span, node);
    }
    return replacingContent = false;
  };

  changeTextNodes = function(node) {
    var parent, _i, _len, _ref;
    parent = node.parentNode;
    if (parent.getAttribute("contenteditable") || (parent.className === "implied") || parent.style.color) {
      return;
    }
    if (node.nodeType === TEXT_NODE) {
      try {
        return replaceTextContent(node);
      } catch (err) {
        return console.log(err);
      }
    } else {
      _ref = node.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        changeTextNodes(node);
      }
    }
  };

  insertion_listener = function(event) {
    return changeTextNodes(event.target);
  };

  cdm_listener = function(event) {
    if (!replacingContent) {
      return replaceTextContent(event.target);
    }
  };

  init = function() {
    var style;
    style = d.createElement("style");
    style.type = "text/css";
    style.textContent = ".implied { color: " + green + " }";
    d.head.appendChild(style, d.head);
    changeTextNodes(d.body);
    d.body.addEventListener("DOMNodeInserted", insertion_listener, false);
    return d.body.addEventListener("DOMCharacterDataModified", cdm_listener, false);
  };

  init();

}).call(this);
