'use strict';

const { isBaseType, isObservable, Observable, Observer } = require('../observable');

module.exports = class ObservableArray extends Array
{
    #observers = new Set();
    #observable_parents = new Map();

    constructor( ...items )
    {
        for( let i = 0; i < items.length; ++i )
        {
            if( !isBaseType( items[i] ) && !isObservable( items[i] ))
            {
                items[i] = Observable( items[i] );
            }
        }

        if( items.fill.length === 1 )
        {
            super();
            super.push( ...items );
        }
        else{ super( ...items )}
        
        this._reset_observable_indexes();
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

    _reset_observable_indexes()
    {
        for( let i = 0; i < this.length; ++i )
        {
            if( !isBaseType( this[i] ))
            {
                this[i]._observable_parents.set( this, i );
            }
        }
    }

    copyWithin( target, start, end )
    {
        // TODO

        return super.copyWithin( target, start, end ); // TODO multiple intexes within same observable instance
    }

    fill( value, start, end )
    {
        // TODO

        return super.fill( value, start, end ); // TODO multiple intexes within same observable instance
    }

    pop()
    {
        const res = super.pop();

        this._reset_observable_indexes();

        return res;
    }

    push( ...items )
    {
        for( let i = 0, length = this.length; i < items.length; ++i )
        {
            if( !isBaseType( items[i] ) && !isObservable( items[i] ))
            {
                items[i] = Observable( items[i] );
                items[i]._observable_parents.set( this, i + length );
            }
        }

        return super.push( ...items );
    }

    reverse()
    {
        const res = super.reverse();

        this._reset_observable_indexes();

        return res;
    }

    shift()
    {
        const res = super.shift();

        this._reset_observable_indexes();

        return res;
    }

    sort( compareFunction )
    {
        const res = super.sort( compareFunction );

        this._reset_observable_indexes();

        return res;
    }

    splice( start, deleteCount, ...items )
    {
        // TODO

        return super.splice( start, deleteCount, ...items );
    }

    unshift( ...items )
    {
        for( let i = 0; i < items.length; ++i )
        {
            if( !isBaseType( items[i] ) && !isObservable( items[i] ))
            {
                items[i] = Observable( items[i] );
            }
        }

        const res = super.unshift( ...items );

        this._reset_observable_indexes();

        return res;
    }
}