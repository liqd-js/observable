'use strict';

const { isBaseType, isObservable, Observable } = require('../observable');
const NOT_FOUND = Symbol('NOT_FOUND');

class ObservableObject extends Object{}

module.exports = new Proxy( ObservableObject, 
{
    construct( target, args )
    {
        let observers = new Set(), observable_parents = new Map(), observable_emit = ( event, path, value ) =>
        {
            for( let observer of observers )
            {
                observer.emit( event, path );
            }

            for( let [ parent, key ] of observable_parents.entries() )
            {
                parent._observable_emit( event, [ key, ...path ]);
            }
        }

        let observable_object = new Proxy( new ObservableObject(), 
        {
            get: ( self, property, receiver ) =>
            {
                if( property === '_observers' )
                {
                    return observers;
                }
                else if( property === '_observable_parents' )
                {
                    return observable_parents;
                }
                else if( property === '_observable_emit' )
                {
                    return observable_emit;
                }

                return Reflect.get( self, property, receiver );
            },

            set: ( self, property, value, receiver ) =>
            {
                //console.log({ property, value });
                if( !isBaseType( value ))
                {
                    if( !isObservable( value ))
                    {
                        value = Observable( value );
                    }

                    value._observable_parents.set( observable_object, property );
                }

                let old_value = self.hasOwnProperty( property ) ? self[property] : NOT_FOUND;

                const res = Reflect.set( self, property, value, receiver );

                if( old_value !== value )
                {
                    observable_emit( old_value === NOT_FOUND ? 'add' : 'update', [ property ], value );
                }

                return res;
            },

            deleteProperty: ( self, property ) =>
            {
                //Emit( observable, 'deleted', property );

                //value._observable_parents.delete( self );

                return Reflect.deleteProperty( self, property );
            }
        });

        if( args[0] )
        {
            for( let property in args[0] )
            {
                observable_object[property] = args[0][property];
            }
        }

        return observable_object;
    }
});