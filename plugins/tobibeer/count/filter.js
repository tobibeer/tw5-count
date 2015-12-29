/*\
title: $:/plugins/tobibeer/count/filter.js
type: application/javascript
module-type: filteroperator

a filter to count input titles or check a the count to be of a given value

@preserve
\*/
(function(){"use strict";exports.count=function(e,t,r){try{var i,s,n,a,o=["eq","neq","lt","lte","gt","gte","is"],c=[],f=t.operand,l=parseInt(f),u=!isNaN(l),p=t.prefix==="!";$tw.utils.each((t.suffix||"").toLowerCase().split(" "),function(e){e=e.trim();if(e){if(e==="$"){i=1}else{n=e}}});if(n&&o.indexOf(n)<0){throw"invalid comparison `"+n+"`, try any of: "+o}else if(!n&&u){n="eq"}else if(n&&!f){l=0;u=1}if(f&&!u){throw"operand `"+f+"` is not a number"}e(function(e,t){c.push(t)});s=c.length;if(n){switch(n){case"eq":case"is":a=s===l;break;case"neq":a=s!==l;break;case"lt":a=s<l;break;case"lte":a=s<=l;break;case"gt":a=s>l;break;case"gte":a=s>=l;break}if(a&&!p||!a&&p){c=i?c:[s.toString()]}else{c=[]}}else{c=[s.toString()]}return c}catch(b){return["count filter error: "+b]}}})();