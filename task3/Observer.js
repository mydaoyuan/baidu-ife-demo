function Observer(obj) {
  this.data = obj;
  this.content = {};
  this.transformAll(obj);
}

Observer.prototype.transformAll = function(obj) {
  var keyarr = Object.keys(obj);
  for (var i=0,len=keyarr.length;i<len;i++) {
    var key = keyarr[i];
    var value = obj[keyarr[i]];
    if (value instanceof Object ) {
        new Observer(value); // value此时为对象，new Observer()会修改此对象，修改的结果展示在了obj当中。
    } else {
      this.convat(key, value);
    }
  }
}
Observer.prototype.convat = function(key, val) {
  var self = this;
  Object.defineProperty(self.data, key, {
    get: function(){
      console.log('你访问了 ' + key);
      return val;
    },
    set: function(newval){
      console.log('你设置了 '+ key + ', ' + '新的值为 ' + newval);
      self.emit(key, newval);
      if (newval instanceof Object ) {
        new Observer(newval);
      }
      val =  newval
    },
    enumerable : true,
    configurable : true
  });
}
Observer.prototype.$watch = function(name, fn) {
  var self = this;
  if (!this.content[name]) {
    this.content[name] = [];
  }
  this.content[name].push(fn);
  // 将emit插入set方法
  return this;
}
Observer.prototype.emit = function(name) {
  var info = Array.prototype.slice.call(arguments,1);
  if (this.content[name]) {
    for (var i =0,len=this.content[name].length;i<len;i++) {
      var fn = this.content[name][i];
      fn.apply(this, info);
    }
  }
  return this;
}

Observer.prototype.off = function(name, fn) {
  if (!fn) {
    this.content[name] = null;
    return this;
  }
  var index = this.content[name].indexOf(fn);
  this.content[name].splice(index, 1);
  return this;
}

// -------------------------------------------------
function tangEvent() {
    this.content = {}
}
tangEvent.prototype.on = function(name, fn) {
  if (!this.content[name]) {
    this.content[name] = [];
  }
  this.content[name].push(fn);
  return this;
}
tangEvent.prototype.emit = function(name) {
  var info = Array.prototype.slice.call(arguments,1);
  if (this.content[name]) {
    for (var i =0,len=this.content[name].length;i<len;i++) {
      var fn = this.content[name][i];
      fn.apply(this, info);
    }
  }
  return this;
}
tangEvent.prototype.off = function(name, fn) {
  if (!fn) {
    this.content[name] = null;
    return this;
  }
  var index = this.content[name].indexOf(fn);
  this.content[name].splice(index, 1);
  return this;
}

var te = new tangEvent();
te.on('wahaha',function(info){console.log('你出发了娃哈哈',info)});
te.on('wahaha',function(info){console.log('你出发了娃哈哈1',info)});
te.emit('wahaha','这是我传去的信息');
