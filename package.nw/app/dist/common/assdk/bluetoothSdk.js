"use strict";function init(){function e(e){var r=function(e){j[e]&&N.stopCharacteristicNotifications(e,function(){j[e]=!1})};for(var t in j)r(t);var i=function(e){P[e]&&N.disconnect(e,function(){P[e]=!1})};for(var a in P)i(a);w.discovering&&l({},function(){}),w={available:!1,powered:!1,discovering:!1},_=!1}function r(e){if(!b.length)return!0;var r=e.uuids,t=b.some(function(e){return r.some(function(r){return r.toUpperCase().indexOf(e.toUpperCase())>=0})});return t}function t(e){if(r(e)&&w.discovering&&_&&(R||!x[e.address])){var t={name:e.name,deviceId:e.address,RSSI:e.inquiryRssi,advertisServiceUUIDs:e.uuids};x[t.deviceId]=t,V?U[t.deviceId]=t:i([t])}}function i(e){D.postMessageToAS({eventName:"onBluetoothDeviceFound",type:"ON_BLUETOOTH_EVENT",data:e})}function a(e){if(P.hasOwnProperty(e.address)&&_&&P[e.address]!==e.connected){var r={connected:e.connected,deviceId:e.address};P[e.address]=e.connected,D.postMessageToAS({eventName:"onBLEConnectionStateChanged",type:"ON_BLUETOOTH_EVENT",data:r})}}function n(e){if(_){var r=e.instanceId||e.uuid,t=j[r],i={value:A(e.value),deviceId:t.deviceId,serviceId:t.serviceId,characteristicId:r};D.postMessageToAS({eventName:"onBLECharacteristicValueChange",type:"ON_BLUETOOTH_EVENT",data:i})}}function s(e){M.getAdapterState(function(r){var t=r.available,i=r.powered,a=r.discovering;w={available:t,powered:i,discovering:a},e&&e()})}function o(e){s(e),M.onDeviceAdded.addListener(t),M.onDeviceChanged.addListener(a),M.onAdapterStateChanged.addListener(k),N.onCharacteristicValueChanged.addListener(n),L.on("RESTART_PROJECT",c),L.on("CLOSE_PROJECT",c),_=!0}function c(r,i){M.onDeviceAdded.removeListener(t),M.onDeviceChanged.removeListener(a),M.onAdapterStateChanged.removeListener(k),N.onCharacteristicValueChanged.removeListener(n),L.removeListener("RESTART_PROJECT",c),L.removeListener("CLOSE_PROJECT",c),e(i)}function d(e,r){return _?void r({errMsg:"openBluetoothAdapter:fail - already opened"}):void o(function(){w.available&&w.powered?r():r({errMsg:"openBluetoothAdapter:fail - bluetooth adapter unavailable"})})}function u(e,r){_?(c(),r()):r({errMsg:"closeBluetoothAdapter:fail - already closed"})}function v(e,r){M.getAdapterState(q(e,function(e,t){r(e?{errMsg:"getBluetoothAdapterState:fail - "+e.message}:w)}))}function f(e,r){if(w.discovering)r({errMsg:"startBluetoothDevicesDiscovery:fail - discovering devices"});else{b=e.args.services||[],R=e.args.allowDuplicatesKey||!1;var a=e.args.interval||0;M.getDevices(function(n){M.startDiscovery(q(e,function(e){if(e)r({errMsg:"startBluetoothDevicesDiscovery:fail - "+e.message});else if(r({discovering:w.discovering=!0}),0===a)n.forEach(function(e){t(e)});else{var s=n.map(function(e){var r={name:e.name,deviceId:e.address,RSSI:e.inquiryRssi,advertisServiceUUIDs:e.uuids};return x[r.deviceId]=r,r});i(s),V=setInterval(function(){var e=Object.keys(U);if(0!==e.length){var r=e.reduce(function(e,r){return e.push(U[r]),e},[]);i(r),U={}}},a)}}))})}}function l(e,r){M.stopDiscovery(q(e,function(e){e?r({errMsg:"stopBluetoothDevicesDiscovery:fail - "+e.message}):(r({discovering:w.discovering=!1}),V&&(clearInterval(V),V=null),R=!1,U={},x={})}))}function g(e,t){M.getDevices(q(e,function(e,i){if(e)t({errMsg:"getBluetoothDevices:fail - "+e.message});else{i=i||[];var a=i.filter(r).map(function(e){return{name:e.name,deviceId:e.address,RSSI:e.inquiryRssi,advertisServiceUUIDs:e.uuids}});t({devices:a})}}))}function p(e,r){M.getDevices(q(e,function(t,i){if(t)r({errMsg:"getConnectedBluetoothDevices:fail - "+t.message});else{i=i||[];var a=e.args.services,n=i.filter(function(e){return e.connected});Promise.all(n.map(function(e){return new Promise(function(r,t){N.getServices(e.address,function(e){var t=e.some(function(e){return e.isPrimary&&a.some(function(r){return r===e.uuid})});r(t)})})})).then(function(e){var t=n.reduce(function(r,t,i){return e[i]&&r.push({name:t.name,deviceId:t.address,RSSI:t.inquiryRssi}),r},[]);r({devices:t})})}}))}function h(e,r){var t=e.args.deviceId;P[t]=!1,N.connect(t,q(e,function(e){e?r({errMsg:"createBLEConnection:fail - "+e.message}):r()}))}function m(e,r){var t=e.args.deviceId;N.disconnect(t,q(e,function(e){e?r({errMsg:"closeBLEConnection:fail - "+e.message}):(P[t]=!1,r())}))}function B(e,r){var t=e.args.deviceId;N.getServices(t,q(e,function(e,t){if(e)r({errMsg:"getBLEDeviceServices:fail - "+e.message});else{t=t||[];var i=t.map(function(e){return{uuid:e.instanceId?e.instanceId:e.uuid,isPrimary:e.isPrimary}});r({services:i})}}))}function C(e,r){var t=e.args.serviceId;N.getCharacteristics(t,q(e,function(e,t){if(e)r({errMsg:"getBLEDeviceCharacteristics:fail - "+e.message});else{var i=["read","write","notify","indicate"];t=t||[];var a=t.map(function(e){return{uuid:e.instanceId||e.uuid,properties:e.properties.reduce(function(e,r){return e[r]=i.indexOf(r)>=0,e},{})}});r({characteristics:a})}}))}function E(e,r){var t=e.args.deviceId,i=e.args.serviceId,a=e.args.characteristicId;N.readCharacteristicValue(a,q(e,function(e,a){e?r({errMsg:"readBLECharacteristicValue:fail - "+e.message}):(r(),a.deviceId=t,a.serviceId=i,n(a))}))}function I(e,r){var t=e.args.characteristicId,i=O(e.args.value);N.writeCharacteristicValue(t,i,q(e,function(e){e?r({errMsg:"writeBLECharacteristicValue:fail - "+e.message}):r()}))}function S(e,r){var t=e.args.deviceId,i=e.args.serviceId,a=e.args.characteristicId,n=e.args.state,s=q(e,function(e){e?r({errMsg:"notifyBLECharacteristicValueChanged:fail - "+e.message}):r()});if(n){if(j[a])return;N.startCharacteristicNotifications(a,s),j[a]={deviceId:t,serviceId:i}}else{if(!j[a])return;N.stopCharacteristicNotifications(a,s),j[a]=null}}var y=require("../log/log.js"),L=require("../../stores/projectStores.js"),D=require("../../actions/webviewActions.js"),T=require("../../utils/base64"),A=T.arrayBufferToBase64,O=T.base64ToArrayBuffer,M=chrome.bluetooth,N=chrome.bluetoothLowEnergy,w={available:!1,powered:!1,discovering:!1},_=!1,b=[],R=!1,V=null,U={},x={},P={},j={},q=function(e,r){return function(){if(chrome.runtime.lastError)y.error("bluetoothSdk.js error, methodName: "+e.sdkName+", errMsg: "+chrome.runtime.lastError.message),r(chrome.runtime.lastError);else{var t=Array.from(arguments);y.info("method "+e.sdkName+" result: "+JSON.stringify(t)),r.apply(null,[null].concat(t))}}},k=q("",function(e,r){if(e)return void y.error("bluetoothSdk.js error","adapterState changed failed",e.message);var t=r.available,i=r.powered,a=r.discovering;w={available:t,powered:i,discovering:a},_&&D.postMessageToAS({eventName:"onBluetoothAdapterStateChange",type:"ON_BLUETOOTH_EVENT",data:w})});_exports={openBluetoothAdapter:d,closeBluetoothAdapter:u,getBluetoothAdapterState:v,startBluetoothDevicesDiscovery:f,stopBluetoothDevicesDiscovery:l,getBluetoothDevices:g,getConnectedBluetoothDevices:p,createBLEConnection:h,closeBLEConnection:m,getBLEDeviceServices:B,getBLEDeviceCharacteristics:C,readBLECharacteristicValue:E,writeBLECharacteristicValue:I,notifyBLECharacteristicValueChanged:S};var J="darwin"===process.platform;Object.getOwnPropertyNames(_exports).forEach(function(e){var r=_exports[e];_exports[e]=function(t,i){return J?_||"openBluetoothAdapter"===t.sdkName?void r.apply(_exports,arguments):void i({errMsg:e+":fail - 请先调用 wx.openBluetoothAdapter 接口进行初始化操作"}):void i({errMsg:e+":fail - 目前蓝牙调试功能暂不支持 Mac 以外的平台"})}})}var _exports;init(),module.exports=_exports;