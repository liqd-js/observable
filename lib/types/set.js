'use strict';

const { isBaseType, isObservable, Observable } = require('../observable');
const NOT_FOUND = Symbol('NOT_FOUND');

module.exports = class ObservableSet extends Set
{
    #observers = new Set();
    #observable_parents = new Map();

    constructor( items )
    {
        super();

        if( items instanceof Set )
        {
            items = [ ...items.values() ];
        }

        if( Array.isArray( items ))
        {
            for( let i = 0; i < items.length; ++i )
            {
                if( !isBaseType( items[i] ) && !isObservable( items[i] ))
                {
                    items[i] = Observable( items[i] );
                }

                this.add( items[i] );
            }
        }
    }

    get _observers()
    {
        return this.#observers;
    }

    get _observable_parents()
    {
        return this.#observable_parents;
    }

    _observable_emit( event, path )
    {
        for( let observer of this.#observers )
        {
            observer.emit( event, path );
        }

        for( let [ parent, key ] of this.#observable_parents.entries() )
        {
            parent._observable_emit( event, [ key, ...path ]);
        }
    }

    add( value )
    {
        if( !isBaseType( value ))
        {
            if( !isObservable( value ))
            {
                value = Observable( value );
            }
            
            value._observable_parents.set( this, undefined );
        }

        const old_value = this.has( value ) ? value : NOT_FOUND;
        
        const res = super.add( value );

        if( old_value === NOT_FOUND )
        {
            this._observable_emit( 'add', [ undefined ], value );
        }

        return res;
    }

    clear()
    {
        let deleted_values = [ ...this.values() ];

        const res = super.clear();

        for( let deleted_value of deleted_values )
        {
            this._observable_emit( 'delete', [ undefined ], deleted_value );
        }

        return res;
    }

    delete( value )
    {
        let old_value = this.has( value ) ? value : NOT_FOUND;

        const res = super.delete( value );

        if( old_value !== NOT_FOUND )
        {
            this._observable_emit( 'delete', [ undefined ], old_value );
        }

        return res;
    }
}