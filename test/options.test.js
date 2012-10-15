var
  inject  = require( '../link-injection' ),
  chai    = require( 'chai' ),
  fs      = require( 'fs' ),
  should  = chai.should(),
  expect  = chai.expect;

var
  expectedCaseSensitiveTrue = fs.readFileSync( 'test/expected/caseSensitiveTrue', 'utf-8' ),
  expectedCaseSensitiveFalse = fs.readFileSync( 'test/expected/caseSensitiveFalse', 'utf-8' ),
//  expectedRepeatDefault = fs.readFileSync( 'test/expected/repeatDefault.html', 'utf-8' ),
//  expectedRepeat3 = fs.readFileSync( 'test/expected/repeat3.html', 'utf-8' ),
  map = {
    'AudioNode' : '#AudioNode',
    'Node'      : '#Node',
    'repeat'    : 'http://repeat.com'
  };

describe( 'Case-sensitive', function () {
  it( 'By default, be case-sensitive', function () {
    var
      html = fs.readFileSync( 'test/data/caseSensitive', 'utf-8' ),
      output = inject.parse( html, map );
    console.log(output);
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

// For when repeat is implemented
/*
describe( 'Repeat', function () {
  it( 'By default should not limit repeats', function () {
    var
      html = fs.readFileSync( 'test/data/repeat.html', 'utf-8' ),
      output = inject.parse( html, map, {
        caseSensitive: false
      });
    fs.writeFileSync('test/expected/repeatDefault.html', output, 'utf-8');
    output.should.equal( expectedRepeatDefault );
  });
  it( 'should transpose regardless of case if case-sensitive is false', function () {
    var
      html = fs.readFileSync( 'test/data/repeat.html', 'utf-8' ),
      output = inject.parse( html, map, {
        caseSensitive: false,
        repeat: 3
      });
    fs.writeFileSync('test/expected/repeat3.html', output, 'utf-8');
    output.should.equal( expectedRepeat3 );
  });
});
*/
