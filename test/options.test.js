var
  inject  = require( '../link-injection' ),
  chai    = require( 'chai' ),
  fs      = require( 'fs' ),
  should  = chai.should(),
  expect  = chai.expect;

var
  expectedCaseSensitiveTrue = fs.readFileSync( 'test/expected/caseSensitiveTrue', 'utf-8' ),
  expectedCaseSensitiveFalse = fs.readFileSync( 'test/expected/caseSensitiveFalse', 'utf-8' ),
  map = {
    'AudioNode' : '#AudioNode',
    'Node'      : '#Node'
  };

describe( 'Case-sensitive', function () {
  it( 'By default, be case-sensitive', function () {
    var
      html = fs.readFileSync( 'test/data/caseSensitive', 'utf-8' ),
      output = inject.parse( html, map );
    output.should.equal( expectedCaseSensitiveTrue );
  });
  it( 'should transpose regardless of case if case-sensitive is false', function () {
    var
      html = fs.readFileSync( 'test/data/caseSensitive', 'utf-8' ),
      output = inject.parse( html, map, {
        caseSensitive: false
      });
    output.should.equal( expectedCaseSensitiveFalse );
  });
});
