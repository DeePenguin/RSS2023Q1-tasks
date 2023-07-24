"use strict";(self.webpackChunkasync_race=self.webpackChunkasync_race||[]).push([[22],{943:(t,e,n)=>{n.r(e),n.d(e,{Garage:()=>W});var r,o=n(803),a=n(85),i=n(613),s=n(785),c=function(){function t(){this.listeners={}}return t.prototype.on=function(t,e){var n,r=null!==(n=this.listeners[t])&&void 0!==n?n:new Set;return r.add(e),t in this.listeners||(this.listeners[t]=r),e},t.prototype.off=function(t,e){var n=this.listeners[t];n&&n.has(e)&&n.delete(e)},t.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var r=this.listeners[t];r&&r.forEach((function(t){t.apply(void 0,e)}))},t}(),u=n(688),l=n(444);!function(t){t.Started="started",t.Stopped="stopped",t.Drive="drive"}(r||(r={}));var p,h,f=n(528),d=function(){return d=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},d.apply(this,arguments)},g=function(t,e,n,r){return new(n||(n=Promise))((function(o,a){function i(t){try{c(r.next(t))}catch(t){a(t)}}function s(t){try{c(r.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,s)}c((r=r.apply(t,e||[])).next())}))},m=function(t,e){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=e.call(t,i)}catch(t){s=[6,t],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}},y=new(function(){function t(){this.endPoint=l.A.Engine,this.http=f.R}return t.prototype.startEngine=function(t){return g(this,void 0,void 0,(function(){return m(this,(function(e){switch(e.label){case 0:return[4,this.http.patch(this.endPoint,{query:{id:t,status:r.Started}})];case 1:return[4,e.sent().json()];case 2:return[2,e.sent()]}}))}))},t.prototype.stopEngine=function(t){return g(this,void 0,void 0,(function(){return m(this,(function(e){switch(e.label){case 0:return[4,this.http.patch(this.endPoint,{query:{id:t,status:r.Stopped}})];case 1:return[4,e.sent().json()];case 2:return[2,e.sent()]}}))}))},t.prototype.startDrive=function(t,e){return g(this,void 0,void 0,(function(){var n;return m(this,(function(o){switch(o.label){case 0:return o.trys.push([0,3,,4]),[4,this.http.patch(this.endPoint,{query:{id:t,status:r.Drive}})];case 1:return[4,o.sent().json()];case 2:return n=o.sent(),[2,d({id:t,duration:e},n)];case 3:return o.sent(),[2,{id:t,duration:e,success:!1}];case 4:return[2]}}))}))},t}()),v=n(71),C=n(508),b=n(698),w=16777215,S=["Kubota","Case","Zoomlion","CLAAS","Dongfeng","Fendt","Lamborghini","Landini","Lovol","McCormick","Same","Steyr","Taihong","Jinma","Zetor","MT3","JCB","CATMANN","ISEKI","Belarus","URSUS","SOLIS","ISEKI","AGROVEGA","VALTRA"],_=["Crystal","Forterra","Major","Proxima","TERRUS","Multi","Argon","Dorado","Explorer","Tiger","Virtus","Landforce","Multifarm","Powerfarm","Trekker","LANDPOWER","Spire","Strike","Crono","Mach","NITRO","Rekord","Agrofarm","Agrolux","Agroplus","Agrotrac","Agrotron","XERION","NEXOS","AXION","ARION","Puma","Magnum","Quadtrac","Farmall"],O=function(t){return Math.floor(Math.random()*t)},P=function(){for(var t=O(w).toString(16);6!==t.length;)t=O(w).toString(16);return"#".concat(t)},A=function(t,e,n,r){return new(n||(n=Promise))((function(o,a){function i(t){try{c(r.next(t))}catch(t){a(t)}}function s(t){try{c(r.throw(t))}catch(t){a(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,s)}c((r=r.apply(t,e||[])).next())}))},I=function(t,e){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(s){return function(c){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,s[0]&&(i=0)),i;)try{if(n=1,r&&(o=2&s[0]?r.return:s[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,s[1])).done)return o;switch(r=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=e.call(t,i)}catch(t){s=[6,t],r=0}finally{n=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,c])}}},B=function(){function t(t){this.itemsPerPage=t,this.garageApi=v.q,this.winnersApi=C.Q,this.engineApi=y,this.carsCount=new b.y(0)}return t.prototype.getCars=function(t){return A(this,void 0,void 0,(function(){var e;return I(this,(function(n){switch(n.label){case 0:return[4,this.garageApi.getCars(t,this.itemsPerPage)];case 1:return e=n.sent(),this.carsCount.setValue(e.totalCount),[2,e.cars]}}))}))},t.prototype.getCar=function(t){return A(this,void 0,void 0,(function(){return I(this,(function(e){switch(e.label){case 0:return[4,this.garageApi.getCar(t)];case 1:return[2,e.sent()]}}))}))},t.prototype.createCar=function(t){var e=t.name,n=t.color;return A(this,void 0,void 0,(function(){var t;return I(this,(function(r){switch(r.label){case 0:return[4,this.garageApi.createCar({name:e,color:n})];case 1:return t=r.sent(),this.carsCount.setValue(this.carsCount.getValue()+1),[2,t]}}))}))},t.prototype.deleteCar=function(t){return A(this,void 0,void 0,(function(){var e;return I(this,(function(n){switch(n.label){case 0:return[4,this.garageApi.deleteCar(t)];case 1:return e=n.sent(),[4,this.winnersApi.deleteWinner(t)];case 2:return n.sent(),this.carsCount.setValue(this.carsCount.getValue()-1),[2,e]}}))}))},t.prototype.updateCar=function(t){var e=t.id,n=t.name,r=t.color;return A(this,void 0,void 0,(function(){return I(this,(function(t){switch(t.label){case 0:return[4,this.garageApi.updateCar(e,{name:n,color:r})];case 1:return[2,t.sent()]}}))}))},t.prototype.generateRandomCars=function(){var t=this;Array.from({length:100},(function(){return{name:"".concat(S[O(S.length)]," ").concat(_[O(_.length)]),color:P()}})).map((function(e){return A(t,void 0,void 0,(function(){return I(this,(function(t){switch(t.label){case 0:return[4,this.createCar(e)];case 1:return t.sent(),[2]}}))}))}))},t.prototype.startCar=function(t){return A(this,void 0,void 0,(function(){var e,n,r;return I(this,(function(o){switch(o.label){case 0:return[4,this.engineApi.startEngine(t)];case 1:return e=o.sent(),n=e.velocity,r=e.distance,[2,Math.round(r/n)]}}))}))},t.prototype.stopCar=function(t){return A(this,void 0,void 0,(function(){return I(this,(function(e){switch(e.label){case 0:return[4,this.engineApi.stopEngine(t)];case 1:return[2,e.sent()]}}))}))},t.prototype.driveCar=function(t,e){return A(this,void 0,void 0,(function(){return I(this,(function(n){return[2,this.engineApi.startDrive(t,e)]}))}))},t.prototype.addWinner=function(t){var e=t.id,n=t.time;return A(this,void 0,void 0,(function(){var t,r,o;return I(this,(function(a){switch(a.label){case 0:t=Number((n/1e3).toFixed(2)),a.label=1;case 1:return a.trys.push([1,4,,6]),[4,this.winnersApi.getWinner(e)];case 2:return r=a.sent(),o=Math.min(t,r.time),[4,this.winnersApi.updateWinner(e,{time:o,wins:r.wins+1})];case 3:return a.sent(),[3,6];case 4:return a.sent(),[4,this.winnersApi.createWinner({id:e,time:t,wins:1})];case 5:return a.sent(),[3,6];case 6:return[2]}}))}))},t}(),N=(p=function(t,e){return p=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},p(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}p(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),D=function(t){function e(e){var n=t.call(this,{className:"car__item"})||this;return n.setStyle({"--car-color":e}),n}return N(e,t),e.prototype.changeColor=function(t){this.setStyle({"--car-color":t})},e}(s.H),R=n(929),j=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),k=function(t){function e(e,n){var r=e.id,o=e.name,a=e.color,i=t.call(this,{className:"car__container"})||this;i.title=new s.H({tag:"h3",className:"car__title"}),i.isCarOnStart=!0,i.isCarDriving=!1,i.animationRequestId=0,i.isSingleStart=!1,i.id=r,i.name=o,i.color=a;var c=new s.H({tag:"header",className:"car__header"}),u=i.createControls(n);c.append(u,i.title);var l=new s.H({className:"car__track"});return i.carItem=new D(i.color),i.title.setContent(i.name),l.append(i.carItem),i.append(c,l),i}return j(e,t),e.prototype.createControls=function(t){var e=this,n=new s.H({className:"car__controls"});return this.updateBtn=new R.z({className:"car__controls-btn",content:"Change"},(function(){t.update({id:e.id,name:e.name,color:e.color})})),this.deleteBtn=new R.z({className:"car__controls-btn",content:"Delete"},(function(){t.delete(e.id)})),this.startBtn=new R.z({className:"car__controls-btn",content:"Start"},(function(){e.startBtn.toggleDisable(!0),e.updateBtn.toggleDisable(!0),e.deleteBtn.toggleDisable(!0),e.isSingleStart=!0,t.start(e.id)})),this.stopBtn=new R.z({className:"car__controls-btn",content:"Stop"},(function(){e.stopBtn.toggleDisable(!0),e.isSingleStart=!1,t.stop(e.id)})),n.append(this.updateBtn,this.deleteBtn,this.startBtn,this.stopBtn),this.stopBtn.toggleDisable(!0),n},e.prototype.changeColor=function(t){this.color=t,this.carItem.changeColor(t)},e.prototype.changeName=function(t){this.name=t,this.title.setContent(this.name)},e.prototype.animateCar=function(t){var e=this,n=null,r=function(o){n||(n=o,e.isCarDriving=!0);var a=Math.min(100,100*(o-n)/t);e.carItem.setStyle({transform:"translateX(".concat(a,"%)")}),a<100?e.animationRequestId=window.requestAnimationFrame(r):(window.cancelAnimationFrame(e.animationRequestId),e.isCarDriving=!1)};this.stopBtn.toggleDisable(!this.isSingleStart),this.animationRequestId=window.requestAnimationFrame(r),this.isCarOnStart=!1},e.prototype.pauseAnimation=function(){this.isCarDriving&&(window.cancelAnimationFrame(this.animationRequestId),this.isCarDriving=!1,this.animationRequestId=0)},e.prototype.returnToStart=function(){this.carItem.setStyle({transform:"translateX(0)"}),this.isCarOnStart=!0,this.startBtn.toggleDisable(!1),this.stopBtn.toggleDisable(!0),this.updateBtn.toggleDisable(!1),this.deleteBtn.toggleDisable(!1)},Object.defineProperty(e.prototype,"isDriving",{get:function(){return this.isCarDriving},enumerable:!1,configurable:!0}),e.prototype.lockControls=function(){this.updateBtn.toggleDisable(!0),this.deleteBtn.toggleDisable(!0),this.startBtn.toggleDisable(!0),this.stopBtn.toggleDisable(!0)},e.prototype.unlockControls=function(){this.updateBtn.toggleDisable(!1),this.deleteBtn.toggleDisable(!1),this.startBtn.toggleDisable(!this.isCarOnStart),this.stopBtn.toggleDisable(this.isCarOnStart)},e}(s.H);!function(t){t.OnStart="start",t.InProgress="progress",t.OnFinish="stop"}(h||(h={}));var F=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),x=function(t){function e(e,n,r){var o=t.call(this,{className:"garage__list"})||this;return o.emitter=e,o.itemsPerPage=r,o.cars={},o.raceObserver=new u.Q((function(t){return o.handleRace(t)})),o.carHandlers={update:function(t){return o.updateCarHandler(t)},delete:function(t){return o.deleteCarHandler(t)},start:function(t){return o.startCarHandler(t)},stop:function(t){return o.stopCarHandler(t)}},n.subscribe(o.raceObserver),o}return F(e,t),e.prototype.clear=function(){this.cars={},this.node.innerHTML=""},e.prototype.updateCarHandler=function(t){this.emitter.emit("update-car",t)},e.prototype.deleteCarHandler=function(t){this.emitter.emit("delete-car",t),this.cars[t].remove(),delete this.cars[t]},e.prototype.startCarHandler=function(t){this.emitter.emit("start-car",t)},e.prototype.stopCarHandler=function(t){this.cars[t].isDriving?(this.pauseCar(t),this.emitter.emit("stop-car",t)):this.cars[t].returnToStart()},e.prototype.showCars=function(t){var e=this;this.clear(),t.forEach((function(t){var n=new k(t,e.carHandlers);e.cars[t.id]=n,e.append(n)}))},e.prototype.addCar=function(t){if(Object.keys(this.cars).length<this.itemsPerPage){var e=new k(t,this.carHandlers);this.cars[t.id]=e,this.append(e)}},e.prototype.updateCar=function(t){this.cars[t.id].changeColor(t.color),this.cars[t.id].changeName(t.name)},e.prototype.startCar=function(t,e){this.cars[t].animateCar(e)},e.prototype.pauseCar=function(t){this.cars[t].pauseAnimation()},e.prototype.stopCar=function(t){this.cars[t].returnToStart()},e.prototype.getCars=function(){return Object.keys(this.cars).map((function(t){return Number(t)}))},e.prototype.handleRace=function(t){switch(t){case h.InProgress:Object.values(this.cars).forEach((function(t){t.lockControls()}));break;case h.OnFinish:Object.values(this.cars).forEach((function(t){t.unlockControls()}))}},e}(s.H),T=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),E=function(){return E=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},E.apply(this,arguments)},H=function(t){function e(e){var n=t.call(this,E(E({},e),{tag:"input"}))||this,r=e.type,o=e.placeholder,a=void 0===o?"":o,i=e.value,s=void 0===i?"":i,c=e.onChange,u=e.onInput;return n.setAttributes({type:r,placeholder:a,value:s.toString()}),c&&n.addListener("change",(function(){return c(n.value)})),u&&n.addListener("input",(function(){return u(n.value)})),n}return T(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.node.value},set:function(t){this.node.value=t.toString()},enumerable:!1,configurable:!0}),e.prototype.reset=function(){this.node.value=""},e.prototype.focus=function(){this.node.focus()},e}(s.H),q=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),V=function(t){function e(e){var n,r=e.carName,o=e.carColor,a=e.submitText,i=e.onTextChange,s=e.onColorChange,c=e.onSubmit,u=e.onCancel,l=this;return(l=t.call(this,{className:"garage__form"})||this).cancelBtn=null,l.carColorInput=l.createColorInput(o,s),l.carNameInput=l.createTextInput(r,i),l.submitBtn=new R.z({className:"btn",content:a},(function(){c({name:l.carNameInput.value,color:l.carColorInput.value}),l.carNameInput.reset(),l.checkValidity()})),u&&(l.cancelBtn=new R.z({className:"btn",content:"Cancel"},(function(){u(),l.carNameInput.reset(),l.checkValidity()}))),l.append(l.carNameInput,l.carColorInput,l.submitBtn,null!==(n=l.cancelBtn)&&void 0!==n?n:""),l.checkValidity(),l}return q(e,t),e.prototype.createColorInput=function(t,e){var n=this;return new H({type:"color",value:t,onChange:e?function(){e(n.carColorInput.value)}:void 0})},e.prototype.createTextInput=function(t,e){var n=this;return new H({type:"text",placeholder:"Enter car name",value:t,onChange:e?function(){e(n.carNameInput.value)}:void 0,onInput:function(){n.checkValidity()}})},e.prototype.checkValidity=function(){var t=0===this.carNameInput.value.length;this.submitBtn.toggleDisable(t)},e.prototype.hide=function(){this.setStyle({display:"none"})},e.prototype.show=function(t){this.setStyle({display:"block"}),t&&this.carNameInput.focus()},e.prototype.setValue=function(t){this.carColorInput.value=t.color,this.carNameInput.value=t.name,this.checkValidity()},e}(s.H),M=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),L=function(t){function e(e,n,r){var o=n.carName,a=void 0===o?"":o,i=n.carColor,s=void 0===i?"":i,c=t.call(this,{className:"garage__controls"})||this;return c.emitter=e,c.startRaceBtn=new R.z({className:"btn",content:"Start Race"},(function(){return c.emitter.emit("request-race")})),c.stopRaceBtn=new R.z({className:"btn",content:"Reset"},(function(){return c.emitter.emit("request-reset-race")})),c.generateRandomCarsBtn=new R.z({className:"btn",content:"Generate random cars"},(function(){return c.emitter.emit("request-random-cars-generation")})),c.selectedCarId=null,c.raceObserver=new u.Q((function(t){c.raceHandler(t)})),r.subscribe(c.raceObserver),c.createForms(a,s),c.append(c.createCarForm,c.updateCarForm,c.generateRandomCarsBtn,c.startRaceBtn,c.stopRaceBtn),c.updateCarForm.hide(),c.lastActiveForm=c.createCarForm,c.stopRaceBtn.toggleDisable(!0),c.emitter.on("update-car",(function(t){c.updateCar(t)})),c}return M(e,t),e.prototype.createForms=function(t,e){var n=this;this.createCarForm=new V({carName:t,carColor:e,submitText:"Create",onTextChange:function(t){return n.emitter.emit("update-store","carName",t)},onColorChange:function(t){return n.emitter.emit("update-store","carColor",t)},onSubmit:function(t){var e=t.name,r=t.color;return n.emitter.emit("request-add-car",{name:e,color:r})}}),this.updateCarForm=new V({carName:"",carColor:"",submitText:"Update",cancelText:"Cancel",onSubmit:function(t){var e=t.name,r=t.color;n.emitter.emit("request-update-car",{id:n.selectedCarId,name:e,color:r}),n.createCarForm.show(),n.updateCarForm.hide(),n.lastActiveForm=n.createCarForm,n.selectedCarId=null},onCancel:function(){n.createCarForm.show(),n.updateCarForm.hide(),n.selectedCarId=null}})},e.prototype.updateCar=function(t){this.selectedCarId=t.id,this.updateCarForm.setValue(t),this.createCarForm.hide(),this.updateCarForm.show(!0),this.lastActiveForm=this.updateCarForm},e.prototype.raceHandler=function(t){switch(console.log(t),t){case h.OnStart:this.stopRaceBtn.toggleDisable(!0),this.startRaceBtn.toggleDisable(!1);break;case h.InProgress:this.startRaceBtn.toggleDisable(!0),this.stopRaceBtn.toggleDisable(!1),this.generateRandomCarsBtn.toggleDisable(!0),this.lastActiveForm.hide();break;case h.OnFinish:this.lastActiveForm.show(),this.generateRandomCarsBtn.toggleDisable(!1)}},e}(s.H),z=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),W=function(t){function e(e){var n=t.call(this,{tag:"section",className:"garage"})||this;return n.store=e,n.itemsPerPage=o.V.garage,n.emitter=new c,n.garageService=new B(n.itemsPerPage),n.raceState=new b.y(h.OnStart),n.controls=new L(n.emitter,n.store,n.raceState),n.list=new x(n.emitter,n.raceState,n.itemsPerPage),n.pageChanger=new u.Q((function(){return n.renderPage()})),n.header=new a.m("Garage",n.garageService.carsCount),n.pagination=new i.t(n.garageService.carsCount,n.itemsPerPage,n.store.currentPage),n.append(n.header,n.pagination,n.controls,n.list),n.renderPage(),n.store.currentPage.subscribe(n.pageChanger),n.emitter.on("update-store",(function(t,e){n.store[t]=e})),n.emitter.on("request-add-car",(function(t){n.createCar(t)})),n.emitter.on("request-update-car",(function(t){n.updateCar(t)})),n.emitter.on("delete-car",(function(t){n.deleteCar(t)})),n.emitter.on("request-random-cars-generation",(function(){n.garageService.generateRandomCars()})),n.emitter.on("start-car",(function(t){n.startCar(t).catch((function(t){console.error(t)}))})),n.emitter.on("stop-car",(function(t){n.stopCar(t)})),n.emitter.on("request-race",(function(){n.startRace()})),n.emitter.on("request-reset-race",(function(){n.stopRace()})),n}return z(e,t),e.prototype.renderPage=function(){var t=this;this.garageService.getCars(this.store.currentPage.getValue()).then((function(e){return t.list.showCars(e)})).catch((function(t){console.error(t)}))},e.prototype.createCar=function(t){var e=this;this.garageService.createCar(t).then((function(t){return e.list.addCar(t)})).catch((function(t){console.error(t)}))},e.prototype.updateCar=function(t){this.list.updateCar(t),this.garageService.updateCar(t).catch((function(t){console.error(t)}))},e.prototype.deleteCar=function(t){var e=this;this.garageService.deleteCar(t).then((function(){e.pagination.isLastPage()||e.renderPage()})).catch((function(t){console.error(t)}))},e.prototype.startCar=function(t){var e=this;return new Promise((function(n){e.garageService.startCar(t).then((function(r){e.list.startCar(t,r),n(e.driveCar(t,r))})).catch((function(t){console.error(t)}))}))},e.prototype.stopCar=function(t){var e=this;this.garageService.stopCar(t).then((function(){return e.list.stopCar(t)})).catch((function(t){console.error(t)}))},e.prototype.driveCar=function(t,e){var n=this;return new Promise((function(r,o){n.garageService.driveCar(t,e).then((function(e){e.success||(n.list.pauseCar(t),o(e)),r(e)})).catch((function(t){console.error(t)}))}))},e.prototype.startRace=function(){var t=this;this.raceState.setValue(h.InProgress);var e=this.list.getCars().map((function(e){return t.startCar(e)}));Promise.any(e).then((function(e){t.addWinner({id:e.id,time:e.duration})})).catch((function(){t.raceState.setValue(h.OnFinish),console.log("all cars are broken")})),Promise.allSettled(e).then((function(){t.raceState.setValue(h.OnFinish)})).catch((function(t){console.error(t)}))},e.prototype.stopRace=function(){var t=this;this.list.getCars().forEach((function(e){t.list.pauseCar(e),t.stopCar(e)})),this.raceState.setValue(h.OnStart)},e.prototype.addWinner=function(t){var e=t.id,n=t.time;this.garageService.addWinner({id:e,time:n}).catch((function(t){console.error(t)}))},e}(s.H)}}]);