(function(){'use strict';function m(b){this.b=new window.MutationObserver(b);this.a=document.createTextNode("");this.b.observe(this.a,{characterData:!0})}function n(b){var a="__pms"+Math.random().toString();window.addEventListener("message",function(c){c.source===window&&c.data===a&&b()})}function p(){this.a=0;this.b=[];this.g=this.f=this.c=null}
function q(b){var a,c;c=r;0===(c.a&8)&&(c.a|=8,window.requestAnimationFrame(c.i));c=c.c;var d;void 0===a&&(a=-1);if(-1===a)c.a|=2,null===c.c&&(c.c=[]),c.c.push(b);else{for(c.a|=1;a>=c.b.length;)c.b.push(null);d=c.b[a];null===d&&(d=c.b[a]=[]);d.push(b)}}var r=null;function t(){this.f=this.a=this.c=this.b=null}
function u(b,a){var c,d;c=b.a;d=null;null!==b.b&&(d=b.b);if(null!==d){var e=c.className;c.className=""===e?d:e+" "+d}if(null!==b.c)if(d=b.c,"string"===typeof d)c.textContent=d;else for(c=0,d=b.c.length;c<d;c++)v(b,b.c[c],null,a)}function w(b,a,c){var d=b.c;b.a=a;if(null!==d&&"string"!==typeof d&&0<d.length){for(var e=a.firstChild,f;8===e.nodeType;)f=e,e=e.nextSibling,a.removeChild(f);for(b=0;b<d.length;b++)for(w(d[b],e,c),e=e.nextSibling;8===e.nodeType;)f=e,e=e.nextSibling,a.removeChild(f)}}
function x(b,a,c){a.a=b.a;var d=b.c;a=a.c;var e,f,g=0,h=!1;if("string"===typeof d)if("string"===typeof a)d!==a&&((c=b.a.firstChild)?c.nodeValue=a:b.a.textContent=a);else{if(null!==a)for(;g<a.length;)v(b,a[g++],null,c)}else if("string"===typeof a){if(null!==d)for(;g<d.length;)y(b,d[g++]);b.a.textContent=a}else if(null!==d&&0!==d.length)if(null===a||0===a.length)for(;g<d.length;)y(b,d[g++]);else if(1===d.length&&1===a.length)e=d[0],f=a[0],e.b===f.b?x(e,f,c):(a=f,b.a.replaceChild(a.a,e.a),u(a,c));else if(1===
d.length){for(e=d[0];g<a.length;){f=a[g++];if(e.b===f.b){x(e,f,c);h=!0;break}v(b,f,e.a,c)}if(h)for(;g<a.length;)v(b,a[g++],null,c);else y(b,e)}else if(1===a.length){for(f=a[0];g<d.length;){e=d[g++];if(e.b===f.b){x(e,f,c);h=!0;break}y(b,e)}if(h)for(;g<d.length;)y(b,d[g++]);else v(b,f,null,c)}else{e=g=0;h=d.length-1;f=a.length-1;for(var l,k;g<=h&&e<=f;){l=d[g];k=a[e];if(l.b!==k.b)break;g++;e++;x(l,k,c)}for(;g<=h&&e<=f;){l=d[h];k=a[f];if(l.b!==k.b)break;h--;f--;x(l,k,c)}for(;g<=h&&e<=f;)if(l=d[g++],
k=a[e++],l.b===k.b)x(l,k,c);else{var D=c;b.a.replaceChild(k.a,l.a);u(k,D)}if(g<=h){do y(b,d[g++]);while(g<h)}else if(e<=f){d=f+1;d=d<a.length?a[d].a:null;do v(b,a[e++],d,c);while(e<f)}}else if(null!==a&&0<a.length)for(g=0;g<a.length;g++)v(b,a[g],null,c)}function z(b){if(null!==b.c&&(b=b.c,"string"!==typeof b))for(var a=0;a<b.length;a++)z(b[a])}function v(b,a,c,d){b.a.insertBefore(a.a,c);u(a,d)}function y(b,a){b.a.removeChild(a.a);z(a)}
function A(b,a,c,d,e,f){this.a=b;this.f=a;this.h=null===c?0:c.h+1;this.g=d;this.b=f;this.c=null}function B(b){3===(b.a&3)&&(b.f.b(b),b.a&=-2)};var C=new function(){this.c="div";this.b=this.a=null}("Hello");C.b=function(b){var a=new t;a.c="Hello "+b.g;null===b.c?(a.f=b,0!==(b.a&8)?(w(a,b.b,b),b.a&=-9):(a.a=b.b,u(a,b))):x(b.c,a,b);b.c=a};
r=new function(){this.a=0;this.f=1;this.b=[];this.h=[];this.g=new p;this.c=new p;var b=this;new m(function(){b.a|=256;for(var a=b.b;0<a.length;){b.b=[];for(var c=0;c<a.length;c++)a[c]();a=b.b}b.f++;b.a&=-258});new n(function(){b.a&=-3;b.a|=256;var a=b.h;if(0<a.length){b.h=[];for(var c=0;c<a.length;c++)a[c]()}b.f++;b.a&=-257});this.i=function(){var a,c,d,e,f,g;b.a&=-9;b.a|=256;a=b.c;b.c=b.g;b.g=a;do{for(;0!==(a.a&3);){if(0!==(a.a&1))for(a.a&=-2,c=a.b,f=0;f<c.length;f++)if(d=c[f],null!==d)for(c[f]=
null,g=0;g<d.length;g++)e=d[g],e.constructor===A?B(e):e.call();if(0!==(a.a&2))for(a.a&=-3,d=a.c,f=0;f<d.length;f++)e=d[f],e.constructor===A?B(e):e.call()}for(;0!==(a.a&4);)for(a.a&=-5,d=a.f,a.f=null,f=0;f<d.length;f++)e=d[f],e()}while(0!==(a.a&3));for(;0!==(a.a&8);)for(a.a&=-9,d=a.g,f=0;f<d.length;f++)e=d[f],e();b.f++;b.a&=-257}};
document.addEventListener("DOMContentLoaded",function(){q(function(){var b=document.body,a=new A(3,C,null,"World",0,document.createElement(C.c));null!==C.a&&C.a(a);b.appendChild(a.b);B(a)})});}).call();