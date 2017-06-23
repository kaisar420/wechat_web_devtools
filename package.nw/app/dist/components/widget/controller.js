"use strict";function init(){var e=(require("fs"),require("../../lib/react.js")),t=(require("../../lib/react-dom.js"),require("../../stores/webviewStores.js"),require("../../stores/windowStores.js")),s=(require("../../actions/windowActions.js"),require("../../actions/webviewActions.js"),require("../../stores/projectStores.js")),i=require("../../actions/projectActions.js"),r=(require("../../cssStr/cssStr.js"),require("../../common/log/log.js"),require("../../common/request/request.js"),require("../../utils/tools.js"),require("./toolbar/toolbar")),o=require("../../config/weappConfig.js"),a=(o.default_tabheight,o.default_backgroundColor,require("./widgetWebview.js")),n=require("../../config/compileTypeConfig.js"),p=e.createClass({displayName:"Controller",getInitialState:function(){var e=s.getProjectConfig(this.props.project),i=this.props.project.compileType,r=t.getWidgetOffset(i);return{offset:r,iconUrl:e.appicon_url+"/0",appName:e.appname,compileType:i}},getRouteName:function(e){return URL.parse(e).pathname.split(".")[0].replace(/^\//,"")},_onCompileTypeChange:function(e){this.setState({compileType:e,offset:t.getWidgetOffset(e)})},_setWebviewInfo:function(e){var s=this;if(e.height){var r=t.getWidgetOffset(this.props.project.compileType);this.setState({offset:r}),setTimeout(function(){i.restart(s.props.project)},17)}},componentDidMount:function(){t.on("SET_WEBVIEW_INFO",this._setWebviewInfo),s.on("ON_COMPILE_CHANGE",this._onCompileTypeChange);var e=this.props.project?1:12;chrome.fontSettings.setMinimumFontSize({pixelSize:e})},componentWillUnmount:function(){t.removeListener("SET_WEBVIEW_INFO",this._setWebviewInfo),s.removeListener("ON_COMPILE_CHANGE",this._onCompileTypeChange)},render:function(){var t=this.state.offset,s=t.width+2,i=this.state.compileType==n.search;return e.createElement("div",{className:"simulator-wrapper"},e.createElement(r,{project:this.props.project,show:this.props.show}),e.createElement("div",{className:"widget-simulator-list-wrapper",style:{width:s}},e.createElement("div",{className:"widget-simulator-hd",style:{display:i?"none":""}},e.createElement("img",{className:"widget-simulator-avatar",src:this.state.iconUrl,alt:""}),e.createElement("p",{className:"widget-simulator-name"},this.state.appName)),e.createElement(a,{project:this.props.project,offset:this.state.offset}),e.createElement("div",{className:"widget-simulator-ft"},e.createElement("i",{className:"widget-simulator-logo"}),e.createElement("span",{className:"widget-simulator-text"},"小程序"))))}});_exports=p}var _exports;init(),module.exports=_exports;