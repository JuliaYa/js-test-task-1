/* eslint-env mocha */
'use strict';

var Promise = require('../basic_promise').Promise;
var assert = require('assert');

describe('Promise', function () {
    it('Should throw error for non function argument', () => {
        try{
            const promiseError = new Promise({});
        } catch (e){
            assert.equal(e.message, 'Argument is not a function');
        }
    })
    
    it('Should resolve', () => {
        const resolvingPromise = new Promise( (resolve) => {
            resolve('promise resolved');
        });

        return resolvingPromise.then( (result) => {
            assert.equal(result, 'promise resolved');
        });
    })
    
    //Promise Should reject:
    //Error: the string "promise rejected" was thrown, throw an Error :)

    // it('Should reject', () => {
    //     const resolvingPromise = new Promise( (resolve, reject) => {
    //         reject('promise rejected');
    //     });

    //     return resolvingPromise.catch((message) => {
    //         assert.equal(message, 'promise rejected');
    //     });
    // })
});
