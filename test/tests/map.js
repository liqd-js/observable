'use strict';

const assert = require('assert');
const ObservableMap = require('../../lib/types/map');

it( 'observable', ( done ) =>
{
    let map = new ObservableMap();

    assert.ok( map._observers instanceof Set );
    assert.ok( map._observable_parents instanceof Map );

    done();
});

it( 'construct', ( done ) =>
{
    let map = new ObservableMap([[ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ]]);

    assert.ok( map instanceof ObservableMap );
    assert.deepStrictEqual([ ...map.keys() ], [ 1, 2, 3 ]);
    assert.deepStrictEqual([ ...map.values() ], [ 'a', 'b', 'c' ]);
    assert.deepStrictEqual([ ...map.entries() ], [[ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ]]);

    done();
});

it( 'construct observable', ( done ) =>
{
    let set = new ObservableMap([[ 'foo', { foo: 'bar' }], [ 'map', new ObservableMap([[ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ]])]]);

    assert.ok( set instanceof ObservableMap );
    //assert.deepStrictEqual([ ...set ], [ 1, 2, 3 ]);

    done();
});


it( 'clear', ( done ) =>
{
    let map = new ObservableMap();
    
    map.clear();

    map.set( 'foo', 'bar' );

    map.clear();
    map.clear();

    done();
});

it( 'delete', ( done ) =>
{
    let map = new ObservableMap();
    
    map.delete( 'foo' );
    map.set( 'foo', 'bar' );
    map.delete( 'foo' );

    done();
});

it( 'set', ( done ) =>
{
    let map = new ObservableMap();
    
    map.set( 'foo', 'bar' );
    map.set( 'foo', 'bar' );

    done();
});