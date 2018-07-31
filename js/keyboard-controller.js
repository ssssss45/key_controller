class keyboardController
{
	constructor(actions_to_bind, target)
	{
		this.pressedKeys=[];

		if (target!=undefined){this.attach(target);}
		if (actions_to_bind!=undefined){this.actions=actions_to_bind;}
		else {this.actions=[]}
		
		this.boundEnable=this.go.bind(this);
		this.boundDisable=this.stop.bind(this);
		this.enabled=true;
		this.focused=true;
	}

//Добавляет в контроллер переданные активности
	bindActions(actions_to_bind){
		if( Array.isArray( actions_to_bind ) ){
			for (var i = 0, len = actions_to_bind.length; i < len; i++) {
				this.actions.push(actions_to_bind[i]);
			}	
		}else{
			this.actions.push( actions_to_bind );
		}
	}

	getActionByName( action_name ){
		for (var i = 0, len = this.actions.length; i < len; i++) {
			var _action = this.actions[i];
			if ( _action.name == action ) return _action;
		}
		return null;
	}

//Активирует объявленную активность - включает генерацию событий для этой активности и проверку по проверке через isActionActive
	enableAction( action_name )
	{
		var _action = this.getActionByName( action_name );
		if( _action ) {
			_action.active = true;
			return true;
		}
		return false;
	}

//Деактивирует объявленную активность - выключает генерацию событий для этой активности и при проверке через isActionActive возвращает false
	disableAction(action)
	{
		for (var i = 0, len = this.actions.length; i < len; i++) {
			if (this.actions[i].name==action){this.actions[i].active=false}
		}	
	}

	go(action){
		if (this.enabled){
			var keyCode=action.keyCode;
			for (var i = 0, len = this.actions.length; i < len; i++) {
				for (var j = 0, len1 = this.actions[i].keys.length; j < len1; j++){
					if((this.actions[i].keys[j]==keyCode)&&(this.actions[i].active==true)&&(document.hasFocus()))
					{
						window[this.actions[i].name](this.target);
						var elem=document.querySelector("#"+this.target);
						var ev=new Event('controls:activate '+this.actions[i].name);
						elem.dispatchEvent(ev);
					}
				}
			}
			var flag=true;
			for (var i = 0, len = this.pressedKeys.length; i < len; i++) {if (this.pressedKeys[i]==keyCode){flag=false}}
			if (flag){this.pressedKeys.push(keyCode);}
		}
	}

	stop(action){
		var keyCode=action.keyCode;

		for (var i = 0, len = this.actions.length; i < len; i++) {
		
			for (var j = 0, len1 = this.actions[i].keys.length; j < len1; j++){
				if(this.actions[i].keys[j]==keyCode){
					var elem = document.querySelector("#"+this.target);
					var ev = new Event('controls:deactivate '+this.actions[i].name);
				}
			}

			for (var i = 0, len = this.pressedKeys.length; i < len; i++) {
				if (this.pressedKeys[i]==keyCode){this.pressedKeys.splice(i,1);}
			}
			
		}
	}

//Нацеливает контроллер на переданный DOM-елемент (вешает слушатели).
	attach(target){
		this.target=target;
		var elem=document.querySelector("#"+target);
		elem.classList.add("keyboardController");
    	document.addEventListener("keydown", this.boundEnable, false);
		document.addEventListener("keyup", this.boundDisable, false);
    }

//Отцепляет контроллер от активного DOM-елемента и деактивирует контроллер.
	detach(){
		console.log("detach");
		var elem=document.querySelector("#"+this.target);
		elem.classList.remove("keyboardController");
		document.removeEventListener("keydown", this.boundEnable);
		document.removeEventListener("keyup", this.boundDisable);
	}

//Проверяет активирована ли переданная активность в контроллере (зажата ли одна из соотвествующих этой активности кнопок)
	isActionActive(action){
		var result=false;
		for (var i = 0, len = this.actions.length; i < len; i++) {
 		 	if((this.actions[i].name==action)&&(this.actions[i].active==true)){result=true};
		}
		return result;
	}

//Проверяет нажата ли переданная кнопка в контроллере
	isKeyPressed(key){
		var result=false;
		for (var i = 0, len = this.pressedKeys.length; i < len; i++) {
			if (this.pressedKeys[i]==key){result=true;}
		}
		return result;
	}
}