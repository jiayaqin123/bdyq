/*简化代码


 $(#box)
 $(.box)
 $(div)
*/

 function $(select,obj){
    if(typeof select=="string"){
    	obj=obj||document;
    	/*alert(select.charAt(0))*/
    	if(select.charAt(0)=="."){
    		/*alert(select.slice(1))*/
    		return getClass(select.slice(1),obj)
    	}else if(select.charAt(0)=="#"){
    		return document.getElementById(select.slice(1))
    	}else if(/^[a-zA-Z][A-Za-z1-6]*$/.test(select)){
    		return obj.getElementsByTagName(select);
    	}else if(/^<[a-zA-Z][A-Za-z1-6]{0,10}>$/.test(select))
        return obj.createElement(select.slice(1,-1))
    }
    if(typeof select=="function"){
    	window.onload=function(){
            select();//这是因为是一个函数名要调用所以要有括号
    	 }
      // on(window,"onload",select);
    }





 }



/* 去除 空格 
  type a  所有
  type  rl 左右
  type  l  左
  type  r  右
  字符串本身有这个方法但是有兼容问题
   
   只返回操作之后的结果(返回操作后没有空格)
   不替换字符串本身
*/
 
 function trim(obj,type){
     type=type||'rl';
     if(type=='a'){
     	return obj.replace(/\s*/g,'');

     }
     if(type=='rl'){
     	return obj.replace(/^\s*|\s*$/g,"");
     }
     if(type=='l'){
     	return obj.replace(/^\s*/g,"");
     }
     if(type=='r'){
     	return obj.replace(/\s*$/g,"");
     }

 }


/* 获取子元素 

   type b 不获取文本
   type  a  获取文本



*/
function getChilds(obj,type){
	type=type||"b";
	if(type=="a"){
       var alls=obj.childNodes;
       var newall=[];
       for(var i=0;i<alls.length;i++){
  	    if(alls[i].nodeType==1||(alls[i].nodeType==3&&trim(alls[i].nodeValue)!="")){
              newall.push(alls[i]);
  	    }
      }
	}
	if(type=="b"){
         var alls=obj.childNodes;
         var newall=[];
       for(var i=0;i<alls.length;i++){
  	    if(alls[i].nodeType==1){
              newall.push(alls[i]);
  	    }
      }


	}
      return newall;

}

/* 获取第一个子节点 */

function getFirst(obj,type){

	 return getChilds(obj,type)[0];
}

/*获取最后一个子节点 */
function getLast(obj,type){
	var all=getChilds(obj,type);
	return all[all.length-1];
}
/*获取任意一个子节点*/
function getNum(obj,index){
	return getChilds(obj)[index];
}

/* 获取下一个兄弟节点 */
function getNext(obj){
  
   var next=obj.nextSibling;
   if(next==null){
   	return false;
   }/*最后一个子元素和父元素之间没有空格或任何东西会报错*/
   while(next.nodeType==8||(next.nodeType==3&&trim(next.nodeValue)=="")){/*满足这个条件继续找*/
   	 next=next.nextSibling;
   	 if(next==null){
   	 	return false;
   	 }/*子元素的下一个有空格就会报错*/

   }
  return next;


}

/*获取上一个兄弟节点*/
function getpre(obj){
   
	var pre=obj.previousSibling;
	if(pre==null){
		return false;
	}while(pre.nodeType==8||(pre.nodeType==3&&trim(pre.nodeValue)=="")){/*满足这个条件继续找*/
		pre=pre.previousSibling;
		if(pre==null){
			return false;
		}
	}
	return pre;
}


/* 插入到某个对象之后 */
function insertAfter(obj,afterobj){
   var next=getNext(afterobj);

   if(next==false){
     afterobj.parentNode.appendChild(obj);
   }else{
   afterobj.parentNode.insertBefore(obj,next);
  }
  


}




/* 获取classname*/

function getClass(classname,obj){
   var obj=obj||document;
   if(obj.getElementsByClassName){
   	 return obj.getElementsByClassName(classname);
   }else{
   	 var arr=[];
   	 var alls=obj.getElementsByTagName('*');
   	 for(var i=0;i<alls.length;i++){
   	   if(check(alls[i].className,classname)){
   	   	 arr.push(alls[i])
   	   }
   	    
   	  }
   	  return arr;
   }
}

function check(oldclassname,newclassname){
	var all=oldclassname.split(" ");
   for(var i=0;i<all.length;i++){
   	if(all[i]==newclassname){
   		return true;
   	}
   }
    return false;
}


/*

兼容文本

*/
function getText(obj,val){
	  if(val==undefined){
	   if(obj.innerText!=undefined){
	   	
	   	return obj.innerText;
	   }else{
	   
	   	 return obj.textContent;
	   }
	}
	 else{
	 	if(obj.innerText!=undefined){
	   /*	alert(1)*/
	   	 obj.innerText=val;
	   }else{
	   	/*alert(2)*/
	   	 obj.textContent=val;
	   }
	 }

}


/*  获取行内、外部样式 */

function getStyle(obj,attr){
	if(obj.currentStyle!=undefined){
		/*console.log("ie")*/
		return obj.currentStyle[attr];
	}else{
		/*console.log("ff")*/
		return getComputedStyle(obj,null)[attr];
	}
}

/* 同一个事件绑定多个事件处理程序
    obj 对象
    eve 事件
    fn 处理程序

 */
function on(obj,eve,fn){
   if(obj.addEventListener){
      obj.addEventListener(eve,fn,false);
   }else{
      obj.attachEvent("on"+eve,fn);
    }
}

/* 删除某个事件中的处理程序中的一个*/
function up(obj,eve,fn){
   if(obj.removeEventListener){
      obj.removeEventListener(eve,fn,false);
   }else{
      obj.detachEvent('on'+eve,fn);
   }

}

/* 鼠标的滚轮事件 */
function onmouseWheel(obj,upcallback,downcallback){
  if(obj.addEventListener){
      obj.addEventListener("mousewheel",scrollFn,false);

      //chrome,safari -webkit-
      obj.addEventListener("DOMMouseScroll",scrollFn,false);
      //firefox -moz-
      }
  else{
      obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
      }
  function scrollFn(e){
      var ev=e||window.event;
      var val=ev.wheelDelta||ev.detail;
      /*console.log(ev.wheelDelta)*/
      if(val==120||val==-3||val==-1){
        // console.log("向上");
        upcallback&&upcallback.call(obj);
      }
      if(val==-120||val==3||val==1){
        // console.log("向下");
        downcallback&&downcallback.call(obj);
      }
      if(ev.preventDefault){
        ev.preventDefault(); //阻止默认浏览器动作(W3C)
      }
        else{
        ev.returnValue = false;//IE中阻止函数器默认动作的方式
        
      }
  }


}