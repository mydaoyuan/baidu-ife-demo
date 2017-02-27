function Observer(obj) {
  this.data = obj;
  this.transformAll(obj);
}

Observer.prototype.transformAll = function(obj) {
  var keyarr = Object.keys(obj);
  for (var i=0,len=keyarr.length;i<len;i++){
    var key = keyarr[i];
    var value = obj[keyarr[i]];
    if (value instanceof Object ) {
        new Observer(value); // value此时为对象，new Observer()会修改此对象，修改的结果展示在了obj当中。
    } else {
      convat.call(this,key, value);
    }
  }

  function convat(key, val){
    Object.defineProperty(this.data, key, {
      get: function(){
        console.log('你访问了 ' + key);
        return val;
      },
      set: function(newval){
        console.log('你设置了 '+ key + ', ' + '新的值为 ' + newval)
        val =  newval
      },
      enumerable : true,
      configurable : true
    });
  }
}
