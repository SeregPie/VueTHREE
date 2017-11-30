!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("three")):"function"==typeof define&&define.amd?define(["three"],t):e.VueThree=t(e.THREE)}(this,function(e){"use strict";e=e&&e.hasOwnProperty("default")?e.default:e;var t=function(){},n={name:"VueThreeRenderer",render:function(e){return e("div",{style:{position:"relative",width:"100%",height:"100%"}},[e("div",{style:{position:"absolute",left:0,right:0,top:0,bottom:0,overflow:"hidden"},ref:"container"},this.$slots.default)])},props:{antialias:{type:Boolean,default:!0},alpha:{type:Boolean,default:!1},clearColor:{type:[String,Number],default:0},clearAlpha:{type:Number,default:1},preserveDrawingBuffer:{type:Boolean,default:!1},intervalBetweenRenderScene:{type:Number,default:1e3/60},intervalBetweenUpdateContainerSize:{type:Number,default:1e3}},data:function(){return{containerWidth:0,containerHeight:0,frozen$renderer:Object.freeze({o:new e.WebGLRenderer({alpha:this.alpha,antialias:this.antialias,preserveDrawingBuffer:this.preserveDrawingBuffer})}),frozen$scene:{o:null},frozen$camera:{o:null}}},beforeCreate:function(){var e=this;Object.entries({setSize:function(){this.renderer.setSize(this.containerWidth,this.containerHeight),this.containerWidth>0&&this.containerHeight>0&&this.camera&&(this.camera.aspect=this.containerWidth/this.containerHeight,this.camera.updateProjectionMatrix())},setClearColor:function(){this.renderer.setClearColor(this.clearColor,this.clearAlpha)}}).forEach(function(n){var o=n[0],i=n[1];e.$options.computed[o]=i,e.$options.watch[o]=t})},mounted:function(){this.$refs.container.appendChild(this.renderer.domElement),this.startToUpdateContainerSize(),this.startToRenderScene()},computed:{renderer:function(){return this.frozen$renderer.o},scene:{get:function(){return this.frozen$scene.o},set:function(e){return this.frozen$scene=Object.freeze({o:e})}},camera:{get:function(){return this.frozen$camera.o},set:function(e){return this.frozen$camera=Object.freeze({o:e})}},startToUpdateContainerSize:function(){return function(){var e=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){e.startToUpdateContainerSize()})},this.intervalBetweenUpdateContainerSize),this.updateContainerSize())}},startToRenderScene:function(){return function(){var e=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){e.startToRenderScene()})},this.intervalBetweenRenderScene),this.renderScene())}}},watch:{},methods:{updateContainerSize:function(){var e=this.$el.getBoundingClientRect(),t=e.width,n=e.height;this.containerWidth=t,this.containerHeight=n},renderScene:function(){this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)}}},o=function(e,t){Array.isArray(t)?e.fromArray(t):!function(e){return e&&"object"==typeof e}(t)?e.setScalar(t):Object.assign(e,t)},i=function(e,t){Array.isArray(t)?e.fromArray(t):Object.assign(e,t)},r={name:"VueThreeObject",render:function(e){return e("div",this.$slots.default)},props:{position:{type:[Object,Array],default:function(){return[0,0,0]}},quaternion:{type:[Object,Array],default:function(){return[0,0,0,1]}},scale:{type:[Object,Array,Number],default:1},name:{type:String,default:""},userData:{default:function(){return{}}}},beforeCreate:function(){var e=this;Object.entries({setPosition:function(){o(this.object.position,this.position)},setQuaternion:function(){i(this.object.quaternion,this.quaternion)},setScale:function(){o(this.object.scale,this.scale)},setName:function(){this.object.name=this.name},setUserData:function(){this.object.userData=this.userData}}).forEach(function(n){var o=n[0],i=n[1];e.$options.computed[o]=i,e.$options.watch[o]=t})},beforeDestroy:function(){this.$parent.object.remove(this.object),this.dispose(this.object)},computed:{object:function(){return new e.Object3D},renderer:function(){return this.$parent.renderer}},watch:{object:{handler:function(e,t){t&&(this.$parent.object.remove(t),this.dispose(t)),this.$parent.object.add(e)},immediate:!0}},methods:{dispose:function(e){}}},a={Renderer:n,Object3D:r,Scene:{name:"VueThreeScene",render:function(e){return e("div",this.$slots.default)},created:function(){this.$parent.scene=this.object},computed:{object:function(){return new e.Scene},renderer:function(){return this.$parent.renderer}}},Fog:{name:"VueThreeFog",render:function(e){return e("div")},props:{color:{type:[Number,String],default:0},near:{type:Number,default:1},far:{type:Number,default:1e3}},mounted:function(){this.$parent.object.fog=this.fog},beforeCreate:function(){var e=this;Object.entries({setColor:function(){this.fog.color.set(this.color)},setNear:function(){this.fog.near=this.near},setFar:function(){this.fog.far=this.far}}).forEach(function(n){var o=n[0],i=n[1];e.$options.computed[o]=i,e.$options.watch[o]=t})},beforeDestroy:function(){this.$parent.object.fog=null},computed:{fog:function(){return new e.Fog}},watch:{}},PerspectiveCamera:{name:"VueThreePerspectiveCamera",mixins:[r],render:r.render,props:{fov:{type:Number,default:50},near:{type:Number,default:.1},far:{type:Number,default:2e3}},beforeCreate:function(){var e=this;Object.entries({setFov:function(){this.object.fov=this.fov},setNear:function(){this.object.near=this.near},setFar:function(){this.object.far=this.far}}).forEach(function(n){var o=n[0],i=n[1];e.$options.computed[o]=i,e.$options.watch[o]=t})},created:function(){this.$parent.$parent.camera=this.object},computed:{object:function(){return new e.PerspectiveCamera}},watch:{}},OrbitControls:{name:"VueThreeOrbitControls",render:function(e){return e("div")},props:{position:{type:[Object,Array],default:function(){return[0,0,0]}},quaternion:{type:[Object,Array],default:function(){return[0,0,0,1]}},enabled:{type:Boolean,default:!0},minDistance:{type:Number,default:0},maxDistance:{type:Number,default:1/0},minZoom:{type:Number,default:0},maxZoom:{type:Number,default:1/0},minPolarAngle:{type:Number,default:0},maxPolarAngle:{type:Number,default:Math.PI},minAzimuthAngle:{type:Number,default:-1/0},maxAzimuthAngle:{type:Number,default:1/0},enableDamping:{type:Boolean,default:!1},dampingFactor:{type:Number,default:.25},enableZoom:{type:Boolean,default:!0},zoomSpeed:{type:Number,default:1},enableRotate:{type:Boolean,default:!0},rotateSpeed:{type:Number,default:1},enablePan:{type:Boolean,default:!0},keyPanSpeed:{type:Number,default:7},autoRotate:{type:Boolean,default:!1},autoRotateSpeed:{type:Number,default:2},enableKeys:{type:Boolean,default:!0},intervalBetweenUpdateControls:{type:Number,default:1e3/60}},data:function(){return{frozen$object:Object.freeze({o:this.createObject()}),value:Object.freeze({position:this.position,quaternion:this.quaternion})}},beforeCreate:function(){var e=this;Object.entries({setEnabled:function(){this.controls.enabled=this.enabled},setMinDistance:function(){this.controls.minDistance=this.minDistance},setMaxDistance:function(){this.controls.maxDistance=this.maxDistance},setMinZoom:function(){this.controls.minZoom=this.minZoom},setMaxZoom:function(){this.controls.maxZoom=this.maxZoom},setMinPolarAngle:function(){this.controls.minPolarAngle=this.minPolarAngle},setMaxPolarAngle:function(){this.controls.maxPolarAngle=this.maxPolarAngle},setMinAzimuthAngle:function(){this.controls.minAzimuthAngle=this.minAzimuthAngle},setMaxAzimuthAngle:function(){this.controls.maxAzimuthAngle=this.maxAzimuthAngle},setEnableDamping:function(){this.controls.enableDamping=this.enableDamping},setDampingFactor:function(){this.controls.dampingFactor=this.dampingFactor},setEnableZoom:function(){this.controls.enableZoom=this.enableZoom},setZoomSpeed:function(){this.controls.zoomSpeed=this.zoomSpeed},setEnableRotate:function(){this.controls.enableRotate=this.enableRotate},setRotateSpeed:function(){this.controls.rotateSpeed=this.rotateSpeed},setEnablePan:function(){this.controls.enablePan=this.enablePan},setKeyPanSpeed:function(){this.controls.keyPanSpeed=this.keyPanSpeed},setAutoRotate:function(){this.controls.autoRotate=this.autoRotate},setAutoRotateSpeed:function(){this.controls.autoRotateSpeed=this.autoRotateSpeed},setEnableKeys:function(){this.controls.enableKeys=this.enableKeys}}).forEach(function(n){var o=n[0],i=n[1];e.$options.computed[o]=i,e.$options.watch[o]=t})},mounted:function(){this.startToUpdateControls()},beforeDestroy:function(){this.dispose(this.controls)},computed:{object:function(){return this.frozen$object.o},renderer:function(){return this.$parent.renderer},controls:function(){return new e.OrbitControls(this.object,this.renderer.domElement)},startToUpdateControls:function(){return function(){var e=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){e.startToUpdateControls()})},this.intervalBetweenUpdateControls),this.updateControls())}}},watch:{controls:{handler:function(e,t){t&&this.dispose(t)},immediate:!0},position:function(e){this.value.position!==e&&this.setObject()},quaternion:function(e){this.value.quaternion!==e&&this.setObject()},value:function(e){var t=e.position,n=e.quaternion;this.$emit("update:position",t),this.$emit("update:quaternion",n)}},methods:{createObject:function(){var t=new e.PerspectiveCamera;return o(t.position,this.position),i(t.quaternion,this.quaternion),t},setObject:function(){this.frozen$object=Object.freeze({o:this.createObject()})},dispose:function(e){e.dispose()},updateControls:function(){this.controls.update(),this.value=Object.freeze({position:this.object.position.toArray(),quaternion:this.object.quaternion.toArray()})}}},PointLight:{name:"VueThreePointLight",mixins:[r],render:r.render,props:{color:{type:[Number,String],default:16777215},intensity:{type:Number,default:1},distance:{type:Number,default:0},decay:{type:Number,default:1}},beforeCreate:function(){var e=this;Object.entries({setColor:function(){this.object.color.set(this.color)},setIntensity:function(){this.object.intensity=this.intensity},setDistance:function(){this.object.distance=this.distance},setDecay:function(){this.object.decay=this.decay}}).forEach(function(n){var o=n[0],i=n[1];e.$options.computed[o]=i,e.$options.watch[o]=t})},computed:{object:function(){return new e.PointLight}},watch:{}}},s={install:function(e){this.components.forEach(function(t){e.component(t.name,t)})},components:Object.values(a)};return Object.assign(s,a),"undefined"!=typeof window&&window.Vue&&window.Vue.use(s),s});
