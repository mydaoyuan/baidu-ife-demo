window.onload=function(){
	/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var aqiData ={

};
var tb=document.createDocumentFragment();
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city=document.getElementById("aqi-city-input").value;
	var num=parseInt(document.getElementById("aqi-value-input").value);
	if(!city||!num|| typeof num!=="number"){
		alert("请输入有效值");
	}
	if(aqiData[city]){
		alert("该城市已存在")
	}
	else{
	aqiData[city]=num;}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var otable=document.getElementById("aqi-table");
	var flag=otable.childNodes.length;
	for(var i=0;i<flag;i++){
		otable.lastChild.remove();
	}
	var tr=document.createElement("tr"),
		td1=document.createElement("td"),
		td2=document.createElement("td"),
		td3=document.createElement("td");
	td1.innerText="城市";
	td2.innerText="空气质量";
	td3.innerText="操作";
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tb.appendChild(tr);
	for(var x in aqiData){
		var datatr=document.createElement("tr"),
		datatd1=document.createElement("td"),
		datatd2=document.createElement("td"),
		datatd3=document.createElement("td");
		datatd1.innerText=x;
		datatd2.innerText=aqiData[x];
		datatd3.innerHTML="<button>删除</button>";
		datatr.appendChild(datatd1);
		datatr.appendChild(datatd2);
		datatr.appendChild(datatd3);
		tb.appendChild(datatr);	
	}

	otable.appendChild(tb);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
 	var delcity=e.target.parentNode.parentNode.firstChild.innerText
 	delete aqiData[delcity];
  	renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var add=document.getElementById("add-btn");
 	 add.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var otable=document.getElementById("aqi-table");
  // var otr=otable.getElementsByTagName("tr");
  // for(var i=0;i<otr.length;i++){
  // 	var delebtn=otr[i].firstChild;
  // 	while(delebtn.nextElementSibling){
  // 		delebtn=delebtn.nextElementSibling;
  // 	}
  // 	delebtn.onclick=delBtnHandle;
  // }
  	otable.onclick=delBtnHandle;
}

init();
}
