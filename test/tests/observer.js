'use strict';

const assert = require('assert');
const { Observable, Observer } = require('../../lib/observable');

it( 'observer', ( done ) =>
{
    let obj = Observable({ foo: 'bar', bar: { foo: 'foobar' }});
    let observer = new Observer();

    observer.observe( obj );

    observer.on( 'update', ( ...data ) => console.log( ...data ));

    obj.foo = 'foo';
    obj.bar.foo = 'bar';

    done();
});