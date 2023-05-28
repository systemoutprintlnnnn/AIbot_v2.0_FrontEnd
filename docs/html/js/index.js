// JavaScript Document
var socket;
$(function(){
	
	$("#sendBox").keydown(function(event){
		if(event.keyCode==13){
			util.send();
		}
	});

	if(!window.WebSocket){
		window.WebSocket = window.MozWebSocket;
	}
	
	if(!window.WebSocket){
		alert("您的浏览器不支持WebSocket协议！推荐使用谷歌浏览器进行测试。");
		return;
	}

	socket = new WebSocket("ws://120.48.169.252:7397");

	socket.onmessage = function(event){

		var module = $(".msgBlockFriendClone").clone();
		module.removeClass("msgBlockFriendClone").addClass("msgBlockFriend").css({display: "block"});
		module.find(".headPoint").attr("src", "img/chatgpt.png");
		module.find(".msgBlock_channelId").text("ChatGpt：");
		module.find(".msgBlock_msgInfo .msgPoint").text(event.data);
		$("#msgPoint").before(module);

		util.divScroll();
	};

	socket.onopen = function(event){
		console.info("打开WebSoket 服务正常，浏览器支持WebSoket!");
 	};

	socket.onclose = function(event){
		console.info("WebSocket 关闭");
	};

	document.onkeydown = function(e) {
		//console.log(e.ctrlKey);
		if (13 == e.keyCode && e.ctrlKey)
		{
			//console.log(c1);
			util.send();
		}
	}

});

var randomNumber = Math.floor(Math.random() * 12) + 1;

util = {
	send: function(){
		if(!window.WebSocket){return;}
		if(socket.readyState == WebSocket.OPEN){
			var module = $(".msgBlockOwnerClone").clone();
			module.removeClass("msgBlockOwnerClone").addClass("msgBlockOwner").css({display: "block"});
			
			module.find(".headPoint").attr("src", "img/head" + randomNumber + ".jpg");
			module.find(".msgBlock_msgInfo .msgPoint").text($("#sendBox").val());

			$("#msgPoint").before(module);

			util.divScroll();

			socket.send(JSON.stringify($("#sendBox").val()));
			$("#sendBox").val("");
		}else{
			alert("WebSocket 连接没有建立成功！");
		}
	},
	divScroll: function(){
		var div = document.getElementById('show'); 
		div.scrollTop = div.scrollHeight; 
	}	
	
};