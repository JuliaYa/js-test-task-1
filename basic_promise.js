var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';


function Promise(source){
  if(typeof source !== 'function'){
    throw new Error('Argument is not a function');
  }
  
  var self = this;
  this.state = PENDING;
  this.source = source;
  this.onFinalized = undefined;
  this.onRejected = undefined;

  var self = this;

  function resolve(value) {
    self.state = FULFILLED;
    console.log(value);
    console.log(self);
    self.onFinalized(value);
  };

  function reject(message){
    self.state = REJECTED;
    console.log(message);
    self.onRejected(message);
  };

  this.then = function(onFinalize, onReject){
    self.onFinalized = onFinalize;
    self.onRejected = onReject;
    return self;
  }

  this.catch = function(onReject){
    self.onRejected = onReject;
    return self;
  }

  function doResolve(){
    self.source(resolve, reject);
  };

  setTimeout(function(){    // todo: make it work synchronously
    doResolve();
  }, 0);
  return this;
};

exports.Promise = Promise;
//==== testing ==========================================================

// var key = false;

// function asyncFunction(resolve, reject) {
//   setTimeout(function() {
//     if(key){
//       resolve('some string');
//     }else{
//       reject('Sorry!');
//     }
//   }, 0)
// }

// function resolve1(value){
//   var newString = value.charAt(0).toUpperCase() + value.slice(1);
//   console.log(newString);
// };

// function reject(message){
//   console.log(message);
// }

// var prom = new Promise(asyncFunction);
// prom.then(resolve1).catch(reject);

// console.log(prom);