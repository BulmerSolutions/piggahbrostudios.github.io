var display = document.getElementsByTagName("display");
var config = document.getElementsByTagName("config");

var TryIt = {
	snippet: {
		code: {
			1: "snip_1",
			2: "snip_2",
			3: "snip_3",
		},
		button: {
			1: document.getElementById("snip_1_BTN"),
			2: document.getElementById("snip_2_BTN"),
			3: document.getElementById("snip_3_BTN"),
			'RESET': document.getElementById("snip_RESET_BTN")
		}
	}
};

TryIt.prototype = {
	initialize: function() {
		
	},
	onClick: function(btn) {
		if(btn === "RESET"){
			onReset();
		} else {
			this.code = findId(TryIt.snippet.code[btn]);
			eval(this.code);
		}
	},
	findId: function(id) {
		var findings = document.getElementById(id);
		return findings
	}
};

// TryIt.prototype.initialize();

function findId(id) {
	if (typeof id === "string") {
    if (document.getElementById(id)) {
      var info = document.getElementById(id);
      return info;
    } else {
      console.error(id + " is not a valid node id!");
    }
  } else {
    console.error('Input is not a string!');
  }
};

var onClick = function(btn) {
	if(btn === "RESET"){
		onReset();
	} else {
		this.code = findId(TryIt.snippet.code[btn]).value;
		eval(this.code);
	}
}

var onReset = function() {
	var Snip1 = findId(TryIt.snippet.code[1]);
	var Snip2 = findId(TryIt.snippet.code[2]);
	var Snip3 = findId(TryIt.snippet.code[3]);
	Snip1.value = Snip1.innerHTML;
	Snip2.value = Snip2.innerHTML;
	Snip3.value = Snip3.innerHTML;
}

PB.application.fullscreen(PB.key['Numpad_1'], 'snip_1');
PB.application.fullscreen(PB.key['Numpad_2'], 'snip_2');
PB.application.fullscreen(PB.key['Numpad_3'], 'snip_3');
PB.application.fullscreen(PB.key['Numpad_8'], 'display');

/*
var sprite = new PB.sprite({
	sheet: 'DemoCatSprite3.png',
	x: 0,
	y: 0,
	width: 32,
	height: 32,
  speed: 40,
  appendTo: 'display'
},{
  idleUp : {start:0,end:0,speed:10},
  idleDown : {start:1,end:1,speed:10},
  idleRight : {start:0,end:0,speed:10},
  idleLeft : {start:4,end:4,speed:10},
  walkUp : {start:0,end:0,speed:10},
  walkDown : {start:1,end:1,speed:10},
  walkLeft : {start:6,end:7,speed:10},
  walkRight : {start:2,end:3,speed:10}
});
*/

document.body.addEventListener('keydown',onKeyDown);
document.body.addEventListener('keyup',onKeyUp);

function onKeyDown(e){
	console.log(e.keyCode);
	switch(e.keyCode){
		case 87: //w
			sprite.run('walkUp');
			sprite.move('up');
		  break;
		case 83: //s
			sprite.run('idleDown');
		  break;
		case 65: //a
			sprite.run('walkLeft');
			sprite.move('left');
		  break;
		case 68: //d
			sprite.run('walkRight');
			sprite.move('right');
		  break;
	};
}

function onKeyUp(e){
	console.log(e.keyCode);
	switch(e.keyCode){
		case 87: 
			sprite.run('idleUp');
			sprite.stop();
		  break;
		case 83: 
			sprite.run('idleDown');
			sprite.stop();
		  break;
		case 65: 
			sprite.run('idleLeft');
			sprite.stop();
		  break;
		case 68: 
			sprite.run('idleRight');
			sprite.stop();
		  break;
	};
}