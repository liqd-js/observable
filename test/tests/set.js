'use strict';

const assert = require('assert');
const ObservableSet = require('../../lib/types/set');

it( 'observable', ( done ) =>
{
    let set = new ObservableSet();

    assert.ok( set._observers instanceof Set );
    assert.ok( set._observable_parents instanceof Map );

    done();
});

it( 'construct', ( done ) =>
{
    let set = new ObservableSet([ 1, 2, 3 ]);

    assert.ok( set instanceof ObservableSet );
    assert.deepStrictEqual([ ...set ], [ 1, 2, 3 ]);

    done();
});

it( 'construct set', ( done ) =>
{
    let set = new ObservableSet( new Set([ 1, 2, 3 ]));

    assert.ok( set instanceof ObservableSet );
    assert.deepStrictEqual([ ...set ], [ 1, 2, 3 ]);

    done();
});

it( 'construct observable', ( done ) =>
{
    let set = new ObservableSet([{ foo: 'bar' }, new ObservableSet([ 1, 2, 3 ])]);

    assert.ok( set instanceof ObservableSet );
    //assert.deepStrictEqual([ ...set ], [ 1, 2, 3 ]);

    done();
});

it( 'add', ( done ) =>
{
    let set = new ObservableSet();
    
    set.add( 'foo' );
    set.add( 'foo' );

    done();
});

it( 'clear', ( done ) =>
{
    let set = new ObservableSet();
    
    set.clear();

    set.add( 'foo' );

    set.clear();
    set.clear();

    done();
});

it( 'delete', ( done ) =>
{
    let set = new ObservableSet();
    
    set.delete( 'foo' );
    set.add( 'foo' );
    set.delete( 'foo' );

    done();
});