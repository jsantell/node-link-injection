(function() {
  var cheerio, defaults, isAnchorNested, makeRegex, parse, _;

  cheerio = require('cheerio');

  _ = require('underscore');

  makeRegex = function(keyword, options) {
    var flags;
    flags = options.caseSensitive ? 'g' : 'gi';
    return new RegExp("\\b(" + keyword + ")\\b", flags);
  };

  isAnchorNested = function($el) {
    var $parent;
    if ($el.name === 'a') return false;
    $parent = $el.parent();
    while (!($parent === $el || $parent === null)) {
      if ($parent.name === 'a') return false;
      $parent = $parent.parent();
    }
    return true;
  };

  defaults = {
    caseSensitive: true,
    repeat: 0
  };

  parse = function(text, map, options) {
    var $, descend, keywords, output, regexMap, replace;
    if (text == null) text = '';
    if (map == null) map = {};
    options = _.extend({}, defaults, options != null ? options : {});
    keywords = Object.keys(map);
    regexMap = {};
    output = '';
    $ = cheerio.load("<div class='link-injection-tag-class'>" + text + "</div>");
    keywords.forEach(function(keyword) {
      return regexMap[keyword] = makeRegex(keyword, options);
    });
    descend = function($el) {
      var $children;
      if ($el[0].type === 'tag' && $el[0].name === 'a') return;
      $children = $el.children();
      $children.each(function() {
        return descend($(this));
      });
      return $el[0].children.forEach(function(node) {
        if (node.type === 'text') return node.data = replace(node.data);
      });
    };
    replace = function(text) {
      _.each(regexMap, function(regex, keyword) {
        return text = text.replace(regex, "<a href='" + map[keyword] + "' title='" + keyword + "'>$1</a>");
      });
      return text;
    };
    descend($('.link-injection-tag-class'));
    return $('.link-injection-tag-class').html();
  };

  module.exports = {
    parse: parse
  };

}).call(this);
