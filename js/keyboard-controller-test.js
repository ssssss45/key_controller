window.addEventListener('load', test );

function test(){

	var topLoc=200;
	var leftLoc=200;

	var left={
		name: "left",
		keys: [37 , 65],
		active: true
	};

	var right={
		name: "right",
		keys: [39 , 68],
		active: true
	};

	var up={
		name: "up",
		keys: [38 , 87],
		active: true
	};
	
	var list=[left, right, up];
	var keycon= new keyboardController(list);
	
	keycon.attach("testdiv")
	var testObject=document.getElementById("testdiv");

	addButton("buttons","addDownButton","add down",addDown);
	addButton("buttons","enableDisableButton","enable/disable",enableDisable);
	addButton("buttons","detachButton","detach",detach);
	addButton("buttons","attachButton","attach",attach);
	addButton("buttons","isActiveButton","is left active",isLeftActive);
	addButton("buttons","isPressedButton","is rightPressed",isRightPressed);
	addButton("buttons","activateLeftButton","Activate left",activateLeft);
	addButton("buttons","deactivateLeftButton","Deactivate left",deactivateLeft);
	

	function addButton(container,id,text,func)
	{
		var buttons = document.getElementById(container);
		var button = document.createElement("button");
		button.id = id;
		button.textContent = text;
		button.onclick = func;
		buttons.appendChild(button);
	}

	function addDown()
	{
		keycon.bindActions({
			name: "down",
			keys: [40 , 68, 83],
			active: true
		});
	}

	function enableDisable()
	{
		keycon.enabled = !keycon.enabled;
		leftActive=false;
		rightActive=false;
		upActive=false;
		downActive=false;
	}

	function attach()
	{
		testObject.removeEventListener("controls:activate",function(e) {
			activateListenerActions(e.detail.action);
		});
		testObject.removeEventListener("controls:activate",function(e) {
			deactivateListenerActions(e.detail.action);
		});
		keycon.attach("testdiv1");
		testObject=document.getElementById("testdiv1");
		testObject.addEventListener("controls:activate",function(e) {
			activateListenerActions(e.detail.action);
		});
		testObject.addEventListener("controls:deactivate",function(e) {
			deactivateListenerActions(e.detail.action);
		});
		topLoc=300;
		leftLoc=300;
	}

	function detach()
	{
		keycon.detach();
	}

	function isRightPressed()
	{
		console.log(keycon.isKeyPressed(39));
	}

	function isLeftActive()
	{
		console.log(keycon.isActionActive("left"));
	}

	function activateLeft()
	{
		keycon.enableAction("left");
	}
	function deactivateLeft()
	{
		keycon.disableAction("left");
	}

	

	testObject.addEventListener("controls:activate",function(e) {
		activateListenerActions(e.detail.action);
	});
	testObject.addEventListener("controls:deactivate",function(e) {
		deactivateListenerActions(e.detail.action);
	});

	var leftActive=false;
	var rightActive=false;
	var upActive=false;
	var downActive=false;
	moveLoop();

	function activateListenerActions(action)
	{
		switch(action)
		{
			case "left": leftActive=true; break;
			case "right": rightActive=true; break;
			case "up": upActive=true; break;
			case "down": downActive=true; break;
		}
	}

	function deactivateListenerActions(action)
	{
		switch(action)
		{
			case "left": leftActive=false; break;
			case "right": rightActive=false; break;
			case "up": upActive=false; break;
			case "down": downActive=false; break;
		}
	}

	function moveLoop()
	{
		if (leftActive) 
		{
			leftLoc=leftLoc-1;
			testObject.style.left=leftLoc+"px";
		}
			
		if (rightActive) 
		{
			leftLoc=leftLoc+1;
			testObject.style.left=leftLoc+"px";
		}
			
		if (upActive) 
		{
			topLoc=topLoc-1;
			testObject.style.top=topLoc+"px";
		}
			
		if (downActive) 
		{
			topLoc=topLoc+1;
			testObject.style.top=topLoc+"px";
		}
		setTimeout(moveLoop,10);
	}
}





