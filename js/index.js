$(function(){
	$btn=$('.btn');
	//$max.slideToggle(500);
	$as=$('.navright')
	$btn.click(function(){
		$as.slideToggle(500);
	})
	var $box=$('.box')
	
	var $innerli=$('.inner li');
	//console.log($innerli)
  	$innerli.css({
  		height:$box.height()
  	})
	
	
})