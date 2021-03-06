(function(){
  var divs = document.getElementsByTagName('div');
  var imgs = document.querySelectorAll('li>img');
  var old = getTime();
  //开始先调用一下，解决页面刚打开的时候时间延时显示的问题。
  for(var i=0;i<divs.length;i++){
    divs[i].getElementsByTagName('img')[0].src = 'img/'+old[i]+'.jpg';
  }
  // autoPlay();
  //开定时器自动更新时间
  setInterval(function(){
    //点的闪烁
    for(var i=0;i<imgs.length;i++){
      imgs[i].src = 'img/colon1.jpg';
    }
    //延时半秒点的闪烁
    setTimeout(function(){
      for(var i=0;i<imgs.length;i++){
        imgs[i].src = 'img/colon.jpg';
      }
    }, 500)
    autoPlay();
  }, 1000)
  function getTime(){
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    //拼成时间字符串
    var time = toTwo(h)+toTwo(m)+toTwo(s);
    return time;
  }
  function autoPlay(){

    var time = getTime();

    // '232020'
    // '232019'
    for(var i=0;i<time.length;i++){
      if(old[i] !== time[i]){

        slied(i,time);
      }

    }
    old = time;
  }
  //图片切换
  function slied(n,time){
    var imgs = divs[n].getElementsByTagName('img');
    imgs[1].src = 'img/'+time[n]+'.jpg';
    move(divs[n],'top',-170,400,function(){
      imgs[0].src = 'img/'+time[n]+'.jpg';
      divs[n].style.top = '';
    })
  }


  //补零
  function toTwo(n){
    return n<10?'0'+n:''+n;
  }


  function move(obj,attr,target,duration,callback){
    var b = parseFloat(getComputedStyle(obj)[attr]);
    var c = target - b;
    var d = duration;
    var now = new Date().getTime();
    obj[attr] = setInterval(function(){
      var t = new Date().getTime() - now;
      var value = b + c / d * t;
      obj.style[attr] = value+"px";
      if(t >= d){
        clearInterval(obj[attr]);
        obj.style[attr] = target+"px";
        callback&&callback();//当到达目标值的时候执行回调函数
      }
    },30)
  }
})()
