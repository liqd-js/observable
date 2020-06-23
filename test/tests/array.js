'use strict';

const assert = require('assert');
const ObservableArray = require('../../lib/types/array');

it( 'observable', ( done ) =>
{
    let arr = new ObservableArray();

    assert.ok( arr._observers instanceof Set );
    assert.ok( arr._observable_parents instanceof Map );

    done();
});

it( 'construct', ( done ) =>
{
    let arr = new ObservableArray( 1, 2, 3 );

    assert.ok( arr instanceof ObservableArray );
    assert.deepStrictEqual([ ...arr ], [ 1, 2, 3 ]);

    done();
});

it( 'construct observable', ( done ) =>
{
    let arr = new ObservableArray( 1, 2, new ObservableArray( 1, 2, 3 ));

    assert.ok( arr instanceof ObservableArray );
    //assert.deepStrictEqual([ ...arr ], [ 1, 2, 3 ]);

    done();
});

it( 'copyWithin', ( done ) =>
{
    let arr = new ObservableArray( 1, 2, 3 );

    assert.deepStrictEqual([ ...arr ], [ 1, 2, 3 ]);

    arr.copyWithin( 0, 2, 3 );

    assert.deepStrictEqual([ ...arr ], [ 3, 2, 3 ]);

    done();
});

it( 'fill', ( done ) =>
{
    let arr = new ObservableArray( 3 );

    assert.deepStrictEqual([ ...arr ], [ undefined, undefined, undefined ]);

    arr.fill( 1, 0, 3 );

    assert.deepStrictEqual([ ...arr ], [ 1, 1, 1 ]);

    done();
});

it( 'pop', ( done ) =>
{
    let arr = new ObservableArray( 1, 2, 3 );

    assert.equal( arr.pop(), 3 );

    assert.deepStrictEqual([ ...arr ], [ 1, 2 ]);

    done();
});

it( 'push', ( done ) =>
{
    let arr = new ObservableArray();

    assert.equal( arr.push( 3 ), 1 );
    assert.equal( arr.push( 2 ), 2 );
    assert.equal( arr.push( 1 ), 3 );

    assert.deepStrictEqual([ ...arr ], [ 3, 2, 1 ]);

    done();
});

it( 'reverse', ( done ) =>
{
    let arr = new ObservableArray( 1, 2, 3 );

    assert.equal( arr.reverse(), arr );
    
    assert.deepStrictEqual([ ...arr ], [ 3, 2, 1 ]);

    done();
});

it( 'shift', ( done ) =>
{
    let arr = new ObservableArray( 1, 2, 3 );

    assert.equal( arr.shift(), 1 );

    assert.deepStrictEqual([ ...arr ], [ 2, 3 ]);

    done();
});

it( 'sort', ( done ) =>
{
    let arr = new ObservableArray( 1, 2, 3 );

    assert.equal( arr.sort(( a, b ) => b - a ), arr );

    assert.deepStrictEqual([ ...arr ], [ 3, 2, 1 ]);

    assert.equal( arr.sort(), arr );

    assert.deepStrictEqual([ ...arr ], [ 1, 2, 3 ]);

    done();
});

it( 'splice', ( done ) =>
{
    let arr = new ObservableArray( 1, 2, 3 );

    assert.deepStrictEqual([ ...arr.splice( 1, 1, 4 )], [ 2 ]);

    assert.deepStrictEqual([ ...arr ], [ 1, 4, 3 ]);

    done();
});

it( 'unshift', ( done ) =>
{
    let arr = new ObservableArray( 1, 2, 3 );

    assert.equal( arr.unshift( 4, 5 ), 5 );

    assert.deepStrictEqual([ ...arr ], [ 4, 5, 1, 2, 3 ]);

    done();
});