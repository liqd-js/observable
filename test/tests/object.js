'use strict';

const assert = require('assert');
const ObservableObject = require('../../lib/types/object');

const Value = val => JSON.stringify( val );

it( 'observable', ( done ) =>
{
    let obj = new ObservableObject();

    assert.ok( obj._observers instanceof Set );
    assert.ok( obj._observable_parents instanceof Map );

    done();
});

it( 'construct', ( done ) =>
{
    let obj = new ObservableObject({ foo: 'bar' });

    assert.ok( obj instanceof ObservableObject );
    assert.deepStrictEqual({ ...obj }, { foo: 'bar' });

    done();
});

it( 'construct observable', ( done ) =>
{
    let obj = new ObservableObject({ foo: 'bar', bar: new ObservableObject({ foo: 'bar' })});

    assert.ok( obj instanceof ObservableObject );
    //assert.deepStrictEqual({ ...obj }, { foo: 'bar' });

    done();
});

it( 'set property', ( done ) =>
{
    let obj = new ObservableObject();

    assert.equal( obj.foo, undefined );
    assert.equal( obj.foo = 'bar', 'bar' );

    assert.deepStrictEqual( { ...obj }, { foo: 'bar' });

    assert.equal( obj.foo = 'foo', 'foo' );
    
    assert.deepStrictEqual( { ...obj }, { foo: 'foo' });

    done();
});

it( 'delete property', ( done ) =>
{
    let obj = new ObservableObject();

    obj.foo = 'bar';

    assert.equal( obj.foo, 'bar' );

    delete obj.foo;

    assert.deepStrictEqual( { ...obj }, {});

    done();
});

it( 'setting not base value', ( done ) =>
{
    let obj = new ObservableObject();

    obj.foo = { foo: { foo: 'bar' } };

    assert.equal( Value( obj ), Value({ foo: { foo: { foo: 'bar' }}}));

    //delete obj.foo;

    //assert.deepStrictEqual( { ...obj }, {});

    done();
});