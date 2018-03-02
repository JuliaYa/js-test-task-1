var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';


function Promise(source){
  if(typeof source !== 'function'){
    throw new TypeError('Argument is not a function');
  }
  
  var self = this;
  this.state = PENDING;
  this.source = source;
  this.onFinalized = undefined;
  this.onRejected = undefined;

  var self = this;

  this.finalize = function(value) {
    this.state = FULFILLED;
    self.onFinalized(value);
  };

  this.reject = function(message){
    this.state = REJECTED;
    self.onRejected(message);
  };

  this.doResolve = function(){
    this.source(this.finalize, this.reject);
  };

  this.doResolve();
  return this;
};

Promise.prototype.then = function(onFinalize){
  this.onFinalized = onFinalize;
  return this;
}

Promise.prototype.catch = function(onReject){
  this.onRejected = onReject;
  return this;
}

//==== testing ==========================================================

var key = false;

function asyncFunction(resolve, reject) {
  setTimeout(function() {
    if(key){
      resolve('some string');
    }else{
      reject('Sorry!');
    }
  }, 3000)
}

function resolve1(value){
  var newString = value.charAt(0).toUpperCase() + value.slice(1);
  console.log(newString);
};

function reject(message){
  console.log(message);
}

var res = new Promise(asyncFunction).then(resolve1).catch(reject);

console.log(res);