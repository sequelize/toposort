var Toposort = require( "../index.js" );
var assert = require( "assert" );

describe( "Toposort", function() {
    it( "should sort correctly", function() {
        var arr, fails, possibilities;
        var t = new Toposort();

        t.add( "3", "2" )
            .add( "2", "1" )
            .add( "6", "5" )
            .add( "5", ["2", "4"] );

        arr = t.sort();
        fails = [];

        assert( Array.isArray( arr ) );

        possibilities = [
            ["3", "6", "5", "4", "2", "1"],
            ["3", "6", "5", "2", "4", "1"],
            ["6", "3", "5", "2", "4", "1"],
            ["6", "3", "5", "2", "1", "4"],
            ["6", "5", "3", "2", "1", "4"],
            ["6", "5", "3", "2", "4", "1"],
            ["6", "5", "4", "3", "2", "1"]
        ];

        possibilities.forEach( function( possibility ) {
            try {
                assert.deepEqual( arr, possibility );

            } catch( e ) {
                fails.push( e );
            }
        } );

        if( fails.length === possibilities.length ) {
            throw fails[0];
        }
    } );

    it( "should find cyclic dependencies", function() {
        var t = new Toposort();
        t.add( "3", "2" )
            .add( "2", "1" )
            .add( "1", "3" );

        try {
            t.sort();

            assert( false );

        } catch( err ) {
            assert( err instanceof Error );
        }
    } );

    it( "#2 - should add the item if an empty array of dependencies is passed", function() {
        var t = new Toposort();
        var out = t.add( "1", [] ).sort();

        assert.deepEqual( out, ["1"] );
    } );

    it( "should handle deeply nested dependencies", function() {
        var t = new Toposort();

        t.add( "3", "1" )
            .add( "6", ["3", "4", "5"] )
            .add( "7", "1" )
            .add( "9", ["8", "6", "7"] )
            .add( "4", ["2", "3"] )
            .add( "2", "3" )
            .add( "5", ["3", "4"] )
            .add( "8", ["1", "2", "3", "4", "5"] );

        var out = t.sort().reverse();

        assert.deepEqual( out, ["1", "3", "2", "4", "5", "6", "7", "8", "9"] );
    } );

    it( "should work on the example dependencies", function() {
        var t = new Toposort();

        t.add( "jquery-ui-core", "jquery" )
            .add( "jquery-ui-widget", "jquery" )
            .add( "jquery-ui-button", ["jquery-ui-core", "jquery-ui-widget"] )
            .add( "plugin", ["backbone", "jquery-ui-button"] )
            .add( "backbone", ["underscore", "jquery"] );

        assert.deepEqual( t.sort().reverse(),
            ["jquery", "jquery-ui-core", "jquery-ui-widget", "jquery-ui-button", "underscore", "backbone", "plugin"] );
    } );

    it("should fail when item is an empty string", function () {
        var t = new Toposort();

        assert.rejects( () => { t.add("", "1") }, (err) => { assert.strictEqual(err.name, "TypeError"); assert.strictEqual(err.message, "Dependent name must be given as a not empty string");} )
    });

    it("should fail when deps is an empty string", function () {
        var t = new Toposort();

        assert.rejects( () => { t.add("1", "") }, (err) => { assert.strictEqual(err.name, "TypeError"); assert.strictEqual(err.message, "Dependent name must be given as a not empty string");} )
    });

    it("should fail when deps is an empty array", function () {
        var t = new Toposort();

        assert.rejects( () => { t.add("1", [""]) }, (err) => { assert.strictEqual(err.name, "TypeError"); assert.strictEqual(err.message, "Dependent name must be given as a not empty string");} )
    });

    it( "should clear", function() {
        var t = new Toposort();
        var out = t.add( "1", "2" )

        assert.deepEqual( out.edges, [["1","2"]] );
        
        var cleared = out.clear();

        assert.deepEqual( cleared.edges, [] );
    } );

} );
