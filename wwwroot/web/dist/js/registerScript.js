!function(){function n(n,t){var e=document.createElement("div");e.className="notyf__toast";var o=document.createElement("div");o.className="notyf__wrapper";var i=document.createElement("div");i.className="notyf__icon";var a=document.createElement("i");a.className=t;var r=document.createElement("div");r.className="notyf__message",r.innerHTML=n,i.appendChild(a),o.appendChild(i),o.appendChild(r),e.appendChild(o);var c=this;return setTimeout(function(){e.className+=" notyf--disappear",e.addEventListener(c.animationEnd,function(n){n.target==e&&c.container.removeChild(e)});var n=c.notifications.indexOf(e);c.notifications.splice(n,1)},c.options.delay),e}this.Notyf=function(){this.notifications=[];var n={delay:2e3,alertIcon:"notyf__icon--alert",confirmIcon:"notyf__icon--confirm"};arguments[0]&&"object"==typeof arguments[0]?this.options=function(n,t){for(property in t)t.hasOwnProperty(property)&&(n[property]=t[property]);return n}(n,arguments[0]):this.options=n;var t=document.createDocumentFragment(),e=document.createElement("div");e.className="notyf",t.appendChild(e),document.body.appendChild(t),this.container=e,this.animationEnd=function(){var n,t=document.createElement("fake"),e={transition:"animationend",OTransition:"oAnimationEnd",MozTransition:"animationend",WebkitTransition:"webkitAnimationEnd"};for(n in e)if(void 0!==t.style[n])return e[n]}()},this.Notyf.prototype.alert=function(t){var e=n.call(this,t,this.options.alertIcon);e.className+=" notyf--alert",this.container.appendChild(e),this.notifications.push(e)},this.Notyf.prototype.confirm=function(t){var e=n.call(this,t,this.options.confirmIcon);e.className+=" notyf--confirm",this.container.appendChild(e),this.notifications.push(e)}}(),"function"==typeof define&&define.amd?define("Notyf",function(){return Notyf}):"undefined"!=typeof module&&module.exports?module.exports=Notyf:window.Notyf=Notyf;
"use strict";const backendUrl="http://localhost:3000";console.log("READY!"),console.log("READY!"),document.getElementById("register").addEventListener("submit",async e=>{e.preventDefault();const t=document.getElementById("email-input").value,n=document.getElementById("username-input").value,o=document.getElementById("password-input").value,a=document.getElementById("password-confirm-input").value,s=new Notyf;if(n.length<4)return void s.alert("Username too short (minimal is 4 characters)");if(o!==a)return void s.alert("Passwords are not equal");const r=await fetch(`${backendUrl}/api/account/register`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({email:t,username:n,password:o,passwordConf:a})}),i=await r.json();if(400==r.status)return void s.alert(i.error);const l=i.token;localStorage.setItem("token",l),window.location.replace("/links")});