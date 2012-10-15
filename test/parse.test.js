var
  inject  = require( '../link-injection' ),
  chai    = require( 'chai' ),
  fs      = require( 'fs' ),
  should  = chai.should(),
  expect  = chai.expect;

var
  expectedHtmlWrap = fs.readFileSync( 'test/expected/htmlWrap.html', 'utf-8' ),
  expectedHtmlNoWrap = fs.readFileSync( 'test/expected/htmlNoWrap.html', 'utf-8' ),
  expectedPlainText = fs.readFileSync( 'test/expected/plainText', 'utf-8' ),
  map = {
    'AudioNode' : '#AudioNode',
    'Node'      : '#Node'
  };

describe( 'Parsing', function () {
  it( 'should correctly parse text wrapped by HTML elements', function () {
    var
      html = fs.readFileSync( 'test/data/htmlWrap.html', 'utf-8' ),
      output = inject.parse( html, map );
    output.should.equal( expectedHtmlWrap );
  });
  it( 'should correctly parse text not wrapped by HTML elements, but containing elements', function () {
    var
      html = fs.readFileSync( 'test/data/htmlNoWrap.html', 'utf-8' ),
      output = inject.parse( html, map );
    output.should.equal( expectedHtmlNoWrap );
  });
  it( 'should correctly parse HTML elements', function () {
    var
      html = fs.readFileSync( 'test/data/plainText', 'utf-8' ),
      output = inject.parse( html, map );
    output.should.equal( expectedPlainText );
  });
});
