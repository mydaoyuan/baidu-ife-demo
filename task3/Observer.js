function Observer(obj) {
  this.data = obj; // 对象挂载点
  this.$p = Array.prototype.slice.call(arguments,1)[0] || 'data'; // 实现事件冒泡储存父级 名字
  this.transformAll(obj); // 对obj对象进行 遍历， 然后调用convat 进行defineProperty改写
}

Observer.prototype.transformAll = function(obj) {
  var keyarr = Object.keys(obj);
  for (var i=0,len=keyarr.length;i<len;i++) {
    var key = keyarr[i];
    var value = obj[keyarr[i]];
    if (value instanceof Object ) {
        new Observer(value,this.$p + '.' + key); // value此时为对象，new Observer()会修改此对象，修改的结果展示在了obj当中。
    } else {
      this.convat(key, value, this.$p); // $p  传入父key
    }
  }
}

Observer.prototype.content = {}

Observer.prototype.convat = function(key, val, $p) {
  var self = this;
  Object.defineProperty(self.data, key, {
    get: function(){
      console.log('你访问了 ' + key);
      return val;
    },
    set: function(newval){
      var allkey = $p+ '.' + key;
      console.log('你设置了 '+ key + ', ' + '新的值为 ' + newval);
      self.emit(allkey, newval);  // 触发形式为 father.child    newval为传入信息
      if (newval instanceof Object ) {
        new Observer(newval, allkey);  // 如果改写为对象
      }
      val =  newval
    },
    enumerable : true,
    configurable : true
  });
}
Observer.prototype.$watch = function(name, fn) {
  if (!this.content[name]) {
    this.content[name] = [];
  }
  this.content[name].push(fn);
  return this;
}
Observer.prototype.emit = function(name) {
  if (name.indexOf('.') !== -1) {
    var parent = name.split('.');
    for (var i =0;i<parent.length;i++){
      this.emit(parent[i]);
    }
  }

  var info = Array.prototype.slice.call(arguments,1);

  if (this.content[name]) {   // 遍历同名事件仓库 执行
    for (var i =0,len=this.content[name].length;i<len;i++) {
      var fn = this.content[name][i];
      fn.apply(this, info);
    }
  }

  return this;
}

Observer.prototype.off = function(name, fn) {  // 解除绑定，如果不传入函数名则取消所有同名事件
  if (!fn) {
    this.content[name] = null;
    return this;
  }
  var index = this.content[name].indexOf(fn);
  this.content[name].splice(index, 1);
  return this;
}


let app2 = new Observer({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});

app2.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});
//
app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
// -------------------------------------------------

//
// function tangEvent() {
//     this.content = {}
// }
// tangEvent.prototype.on = function(name, fn) {
//   if (!this.content[name]) {
//     this.content[name] = [];
//   }
//   this.content[name].push(fn);
//   return this;
// }
// tangEvent.prototype.emit = function(name) {
//   var info = Array.prototype.slice.call(arguments,1);
//   if (this.content[name]) {
//     for (var i =0,len=this.content[name].length;i<len;i++) {
//       var fn = this.content[name][i];
//       fn.apply(this, info);
//     }
//   }
//   return this;
// }
// tangEvent.prototype.off = function(name, fn) {
//   if (!fn) {
//     this.content[name] = null;
//     return this;
//   }
//   var index = this.content[name].indexOf(fn);
//   this.content[name].splice(index, 1);
//   return this;
// }
//
// var te = new tangEvent();
// te.on('wahaha',function(info){console.log('你出发了娃哈哈',info)});
// te.on('wahaha',function(info){console.log('你出发了娃哈哈1',info)});
// te.emit('wahaha','这是我传去的信息');
