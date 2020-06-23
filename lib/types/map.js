'use strict';

const { isBaseType, isObservable, Observable } = require('../observable');
const NOT_FOUND = Symbol('NOT_FOUND');

module.exports = class ObservableMap extends Map
{
    #observers = new Set();
    #observable_parents = new Map();

    constructor( pairs )
    {
        super();

        if( pairs instanceof Map )
        {
            pairs = [ ...pairs.entries() ];
        }

        if( Array.isArray( pairs ))
        {
            for( let pair of pairs )
            {
                if( !isBaseType( pair[1] ) && !isObservable( pair[1] ))
                {
                    pair[1] = Observable( pair[1] );
                }

                this.set( pair[0], pair[1] );
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

    clear()
    {
        if( this.size )
        {
            //this.#dirty = true;
        }

        return super.clear();
    }

    delete( key )
    {
        let old_value = NOT_FOUND;

        if( this.has( key ))
        {
            old_value = this.get( key );

            if( isObservable( old_value ))
            {
                old_value._observable_parents.delete( this );
            }
        }

        const res = super.delete( key );

        if( old_value !== NOT_FOUND )
        {
            this._observable_emit( 'delete', [ key ], old_value );
        }

        return res;
    }

    set( key, value )
    {
        if( !isBaseType( value ))
        {
            if( !isObservable( value ))
            {
                value = Observable( value );
            }
            
            value._observable_parents.set( this, key );
        }

        let old_value = NOT_FOUND;
        
        if( this.has( key ))
        {
            old_value = this.get( key );

            if( isObservable( old_value ))
            {
                old_value._observable_parents.delete( this );
            }
        }

        const res = super.set( key, value );

        this._observable_emit( old_value === NOT_FOUND ? 'add' : 'update', [ key ], value );

        return res;
    }
}