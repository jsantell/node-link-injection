# link-injection.coffee
# (c) 2012 Jordan Santell; Licensed MIT

cheerio = require 'cheerio'
_ = require 'underscore'

makeRegex = ( keyword, options ) ->
  flags = 'g'
  flags += 'i' unless options.caseSensitive
  # flags += 'g' if options.repeat is 0
  new RegExp "\\b(#{keyword})\\b", flags

defaults =
  caseSensitive: true
  repeat: 0

parse = ( text, map, options ) ->
  text ?= ''
  map ?= {}
  options = _.extend {}, defaults, options ? {}
  keywords = Object.keys map
  regexMap = {}
  countMap = {}
  output = ''

  # Let's wrap our text in a div incase the text doesn't
  # have any markup, or if it does and is not wrapped in an element
  $ = cheerio.load "<div class='link-injection-tag-class'>#{text}</div>"

  keywords.forEach ( keyword ) ->
    regexMap[ keyword ] = makeRegex keyword, options
    countMap[ keyword ] = 0

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
      # TODO A few checks for the repeat option, still in work
      while regex.test( text ) and ( countMap[ keyword ] < options.repeat or options.repeat is 0 )
        text = text.replace regex, "<a href='#{map[ keyword ]}' title='#{keyword}'>$1</a>"
        countMap[ keyword ]++
        break if options.repeat is 0
      countMap[ keyword ] = 0
    return text

  descend $('.link-injection-tag-class')

  $('.link-injection-tag-class').html()


module.exports = { parse: parse }
