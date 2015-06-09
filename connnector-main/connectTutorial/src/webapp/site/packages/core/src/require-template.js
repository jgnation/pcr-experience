define("template",["jquery","packages/core/src/lib/handlebars","require"],function($,Handlebars,req){function getKey(e){return e.replace(/[\.\/]/g,"_")}function Template(){}var logger=console;require.specified("logger")&&req(["logger"],function(e){logger=e});var runningTemplatePath=null;return Template.prototype.getRunningTemplateRelativePath=function(e){return require.toUrl(runningTemplatePath+e)},Template.prototype.renderToView=function(e,t){var n=this.render(t),r=$(n).appendTo("<div>").parent().children();if(r.length!==1)throw"renderToView requires template to have a single root element";e.id&&(r.attr("id")||r.attr("id",e.id));var i=$(e.$element||e.$el);e.setElement(r),i.replaceWith(r)},Template.prototype.load=function(e,t,n,r){function i(t){var n=t.render,r=e.replace(/[^\/]+$/,"");t.render=function(e,i){e=e||{},runningTemplatePath=r;var s=n.call(t,e,i);return runningTemplatePath=null,s}}var s=new Template;if(!r.isBuild){var o=getKey(e);s.location=e,t.specified(o)?t([o],function(e){s.render=function(t,n){return Handlebars.template(e)(t,n)},i(s),n(s)}):$.ajax(t.toUrl(e),{dataType:"text"}).done(function(e){s.render=Handlebars.compile(e),i(s),n(s)})}else n()},Template.prototype.normalize=function(e,t){e.match(/\.html?$/)==null&&(e+=".html");var n="",r=e.lastIndexOf("!");return r>0&&(n=e.substring(0,r+1),e=e.substring(r+1)),n+t(e)},Template.prototype.write=function(pluginName,moduleName,write){var fs=require.nodeRequire("fs"),HandlebarsShim="(function() {var module = undefined;"+fs.readFileSync("../build/handlebars.js").toString()+"return Handlebars;})();",Handlebars=eval(HandlebarsShim),renderFunc=fs.readFileSync(moduleName).toString().replace(/^\uFEFF/,"");renderFunc=Handlebars.precompile(renderFunc).toString(),write.asModule(getKey(moduleName),"define(function() { return ("+renderFunc+"); });")},new Template})