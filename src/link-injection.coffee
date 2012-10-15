cheerio = require 'cheerio'
_ = require 'underscore'

makeRegex = ( keyword, options ) ->
  flags = if options.caseSensitive then 'g' else 'gi'
  new RegExp "\\b(#{keyword})\\b", flags

# Current text must not be nested inside of an anchor
isAnchorNested = ( $el ) ->
  return false if $el.name is 'a'

  $parent = $el.parent()
  until $parent is $el or $parent is null
    return false if $parent.name is 'a'
    $parent = $parent.parent()

  return true

defaults =
  caseSensitive: true
  repeat: 0

parse = ( text, map, options ) ->
  text ?= ''
  map ?= {}
  options = _.extend {}, defaults, options ? {}
  keywords = Object.keys map
  regexMap = {}
  output = ''

  # Let's wrap our text in a div incase the text doesn't
  # have any markup, or if it does and is not wrapped in an element
  $ = cheerio.load "<div class='link-injection-tag-class'>#{text}</div>"

  keywords.forEach ( keyword ) ->
    regexMap[ keyword ] = makeRegex keyword, options

  descend = ( $el ) ->
    return if $el[0].type is 'tag' and $el[0].name is 'a'
    $children = $el.children()
    # Check children elements
    $children.each () ->
      descend $(@)

    # Parse text nodes
    $el[0].children.forEach ( node ) ->
      if node.type is 'text'
        node.data = replace node.data

  replace = ( text ) ->
    _.each regexMap, ( regex, keyword ) ->
      text = text.replace regex, "<a href='#{map[ keyword ]}' title='#{keyword}'>$1</a>"
    return text

  descend $('.link-injection-tag-class')

  $('.link-injection-tag-class').html()


module.exports = { parse: parse }
