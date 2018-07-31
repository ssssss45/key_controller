class keyboardController
{
	constructor(actions_to_bind, target)
	{
//массив с кодами нажатых кнопок
		this.pressedKeys=[];
		this.keys=[];
		this.actions=[]
		if (target!=undefined){this.attach(target);}
		if (actions_to_bind!=undefined){this.bindActions(actions_to_bind);}
		this.boundCreateControlsActivateEvent=this.createControlsActivateEvent.bind(this);
		this.boundCreateControlsDeactivateEvent=this.createControlsDeactivateEvent.bind(this);
		this.enabled=true;
		this.focused=true;
	}

//Добавляет в контроллер переданные активности
	bindActions(actions_to_bind){
		if( Array.isArray( actions_to_bind ) ){
			for (var i = 0, len = actions_to_bind.length; i < len; i++) {
						this.addKeys(actions_to_bind[i]);
						this.actions.push(actions_to_bind[i]);
			}	
		}else{
			this.actions.push( actions_to_bind );
			this.addKeys(actions_to_bind);
		}
	}

//Добавление действий в массив кнопок
	addKeys(action)
	{
			for (var i = 0, len = action.keys.length; i < len; i++) {
				if (this.keys[action.keys[i]]==undefined) {this.keys[action.keys[i]]=[];}
				this.keys[action.keys[i]].push(action.name);
			}
	}

//Получение ссылки на действие по названию
	getActionByName( action_name ){
		for (var i = 0, len = this.actions.length; i < len; i++) {
			var _action = this.actions[i];
			if ( _action.name == action_name ) return _action;
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
	disableAction( action_name )
	{
		var _action = this.getActionByName( action_name );
		if( _action ) {
			_action.active = false;
			return true;
		}
		return false;
	}

	createControlsActivateEvent(action){
		var keyCode=action.keyCode;
		this.pressedKeys[keyCode]=true;
		if ((this.enabled)&&(this.keys[keyCode]!=undefined)){
			var elem=document.querySelector("#"+this.target);
			for (var i = 0, len = this.keys[keyCode].length; i < len; i++)
			{
				var _action = this.getActionByName( this.keys[keyCode][i] );
				if (_action.active)
				{
					var activationEvent = new CustomEvent("controls:activate", {
					detail: {
								action: this.keys[keyCode][i]
							}
							});
					var elem=document.querySelector("#"+this.target);
					elem.dispatchEvent(activationEvent);
				}
			}	
		}
	}

	createControlsDeactivateEvent(action){
		var keyCode=action.keyCode;
		this.pressedKeys[keyCode]=false;
		if ((this.enabled)&&(this.keys[keyCode]!=undefined)){
			var elem=document.querySelector("#"+this.target);
			for (var i = 0, len = this.keys[keyCode].length; i < len; i++)
			{
				var _action = this.getActionByName( this.keys[keyCode][i] );
				if (_action.active)
				{
					var deactivationEvent = new CustomEvent("controls:deactivate", {
					detail: {
								action: this.keys[keyCode][i]
							}
							});
					var elem=document.querySelector("#"+this.target);
					elem.dispatchEvent(deactivationEvent);
				}
			}	
		}
	}

//Нацеливает контроллер на переданный DOM-елемент (вешает слушатели).
	attach(target){
		this.target=target;
		var elem=document.querySelector("#"+target);
		elem.classList.add("keyboardController");
    	document.addEventListener("keydown", this.boundCreateControlsActivateEvent, false);
		document.addEventListener("keyup", this.boundCreateControlsDeactivateEvent, false);
    }

//Отцепляет контроллер от активного DOM-елемента и деактивирует контроллер.
	detach(){
		var elem=document.querySelector("#"+this.target);
		elem.classList.remove("keyboardController");
		document.removeEventListener("keydown", this.boundCreateControlsActivateEvent);
		document.removeEventListener("keyup", this.boundCreateControlsDeactivateEvent);
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
		var result=this.pressedKeys[key];
		if (result==undefined)
			{
				result=false;
			}
		return result;
	}
}