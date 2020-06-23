'use strict'

const assert = require('assert');
const { Observable } = require('../../lib/observable');

it( 'change', ( done ) =>
{
    let state = Observable(
    {
        foo: new Map([[ 'a', 'b' ], [ 'bar', [ 'a', { foo: 'bar', bar: 5 }, 5 ]]])
    });

    //console.log( state );
    //state.foo[1].foo = 'foo';

    //console.log('CHANGE', state.get('bar'));
   
    state.foo.get('bar')[1].foo = 'foo';
    state.foo.get('bar')[1].bar++;
    //state.foo.get('bar')[1].barbadosa++;

    done();
}); 