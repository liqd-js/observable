'use strict';

const EventEmmiter = require('events');

const BASE_TYPES = [ 'undefined', 'boolean', 'number', 'bigint', 'string', 'symbol', 'function' ]

module.exports.isBaseType = function isBaseType( value )
{
    return value === null || BASE_TYPES.includes( typeof value );
}

module.exports.isObservable = function isObservable( value )
{
    const ObservableObject = require('./types/object');
    const ObservableArray = require('./types/array');
    const ObservableMap = require('./types/map');
    const ObservableSet = require('./types/set');

    return (
        value instanceof ObservableObject ||
        value instanceof ObservableArray ||
        value instanceof ObservableMap ||
        value instanceof ObservableSet
    );
}

module.exports.Observable = function Observable( value )
{
    const ObservableObject = require('./types/object');
    const ObservableArray = require('./types/array');
    const ObservableMap = require('./types/map');
    const ObservableSet = require('./types/set');
    
    if( Array.isArray( value ))
    {
        value = new ObservableArray( ...value );
    }
    else if( value instanceof Map )
    {
        value = new ObservableMap( value );
    }
    else if( value instanceof Set )
    {
        value = new ObservableSet( value );
    }
    else if( typeof value === 'object' )
    {
        value = new ObservableObject( value );
    }

    return value;
}

module.exports.Observer = class Observer extends EventEmmiter
{
    #observables = new Set();

    constructor( observable )
    {
        super();
    }

    observe( observable )
    {
        observable._observers.add( this );
        this.#observables.add( observable );
    }

    destroy()
    {
        
    }
}

/*module.exports = function Observable()
{
    
}*/