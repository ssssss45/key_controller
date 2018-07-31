

window.addEventListener('load', test );

function test(){
	
	console.log("TEST");

	var topLoc=200;
	var leftLoc=200;

	var left={
		name: "left",
		keys: [37 , 65],
		active: true
	};

	var right={};
	right.name="right";
	right.keys=[39,68];
	right.active=true;

	var up={};
	up.name="up";
	up.keys=[38 , 87];
	up.active=true;
	
	var list=[];
	list.push(left);
	list.push(right);
	list.push(up);
	
	var keycon= new keyboardController(list);
	
	keycon.attach("testdiv")
	//keycon.attach("testdiv");

	createButtons();

	function createButtons(key)
	{
		var buttons = document.getElementById("buttons");

		var button1 = document.createElement("button");
		button1.id = "addButton";
		button1.textContent = "add down";
		button1.onclick = addDown;
		buttons.appendChild(button1);

		var button2 = document.createElement("button");
		button2.id = "disButton";
		button2.textContent = "enable/disable";
		button2.onclick = endis;
		buttons.appendChild(button2);

		var button3 = document.createElement("button");
		button3.id = "detButton";
		button3.textContent = "detach";
		button3.onclick = detach;
		buttons.appendChild(button3);

		var button4 = document.createElement("button");
		button4.id = "attButton";
		button4.textContent = "attach";
		button4.onclick = attach;
		buttons.appendChild(button4);

		var button5 = document.createElement("button");
		button5.id = "activeButton";
		button5.textContent = "is left active";
		button5.onclick = isactive;
		buttons.appendChild(button5);

		var button6 = document.createElement("button");
		button6.id = "pressedButton";
		button6.textContent = "right is pressed";
		button6.onclick = ispressed;
		buttons.appendChild(button6);

		var button7 = document.createElement("button");
		button7.id = "activateleft";
		button7.textContent = "activate left";
		button7.onclick = activate;
		buttons.appendChild(button7);

		var button8 = document.createElement("button");
		button8.id = "deactivateleft";
		button8.textContent = "deactivate left";
		button8.onclick = deactivate;
		buttons.appendChild(button8);
	}

	function addDown()
	{
		keycon.bindActions({
			name: "down",
			keys: [40 , 68, 83],
			active: true
		});
	}

	function endis()
	{
		keycon.enabled = !keycon.enabled;
	}

	function detach()
	{
		keycon.detach();
	}

	function attach()
	{
		keycon.attach("testdiv1");
	}

	function ispressed()
	{
		console.log(keycon.isKeyPressed(39));
	}

	function isactive()
	{
		console.log(keycon.isActionActive("left"));
	}

	function activate()
	{
		keycon.enableAction("left");
	}
	function deactivate()
	{
		keycon.disableAction("left");
	}


	function left(name)
	{
		var element=document.getElementById(name);
		leftLoc=leftLoc-10;
		element.style.left=leftLoc+"px";
	}

	function right(name)
	{
		var element=document.getElementById(name);
		leftLoc=leftLoc+10;
		element.style.left=leftLoc+"px";
	}

	function up(name)
	{
		var element=document.getElementById(name);
		topLoc=topLoc-10;
		element.style.top=topLoc+"px";
	}

	function down(name)
	{
		var element=document.getElementById(name);
		topLoc=topLoc+10;
		element.style.top=topLoc+"px";
	}

}





