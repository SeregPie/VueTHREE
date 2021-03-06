(function() {

	var defaultCameraPosition = [0, 0, 5/2];
	var defaultCameraQuaternion = [0, 0, 0, 1];

	new Vue({
		el: '#app',

		data: {
			backgroundColor: '#253037',
			cameraPosition: defaultCameraPosition,
			cameraQuaternion: defaultCameraQuaternion,
			lightPosition: [1, 1, 1],
			points: Array
				.from({length: 100})
				.map(function() {
					return {
						position: (new THREE.Vector3())
							.setX(Math.random())
							.setY(Math.random())
							.setZ(Math.random())
							.subScalar(1/2)
							.setLength(1/6 + Math.random() * 5/6)
							.toArray(),
						scale: 1/100 + Math.random() * 1/25,
					};
				}),
			primaryColor: '#ececeb',
			secondaryColor: '#a3ff00',
		},

		computed: {
			threeObjects: function() {
				var threeSphereHelper = this.threeSphereHelper;
				var threePoints = this.threePoints;
				var returns = {};
				if (threeSphereHelper) {
					returns['sphereHelper'] = threeSphereHelper;
				}
				Object.entries(threePoints).forEach(function(entry) {
					var key = entry[0];
					var object = entry[1];
					returns[JSON.stringify(['point', key])] = object;
				});
				return returns;
			},

			threePoints: function() {
				var points = this.points;
				var primaryColor = this.primaryColor;
				var returns = {};
				points.forEach(function(point, pointIndex) {
					var threePointKey = ''+pointIndex;
					var threePoint = {
						component: 'myPoint',
						props: {
							color: primaryColor,
							position: point.position,
							scale: point.scale,
						},
					};
					returns[threePointKey] = threePoint;
				});
				return returns;
			},

			threeSphereHelper: function() {
				var primaryColor = this.primaryColor;
				return {
					component: 'mySphereHelper',
					props: {
						color: primaryColor,
					},
				};
			},
		},

		methods: {
			resetCamera: function() {
				this.cameraPosition = defaultCameraPosition;
				this.cameraQuaternion = defaultCameraQuaternion;
			},
		},

		components: {
			myPoint: {
				mixins: [VueThree.Object],

				props: {
					color: {},
				},

				computed: {
					object: function() {
						return new THREE.Mesh(
							new THREE.SphereBufferGeometry(1/2, 24, 24),
							new THREE.MeshStandardMaterial({
								metalness: 2/3,
								roughness: 2/3,
							})
						);
					},
				},

				created: (function() {
					var watchComputed = [
						function() {
							this.object.material.emissive.set(this.color);
						},
					];
					return function() {
						watchComputed.forEach(function(func) {
							this.$watch(func);
						}, this);
					};
				})(),

				methods: {
					dispose: function(object) {
						object.geometry.dispose();
						object.material.dispose();
					},
				},
			},

			mySphereHelper: {
				mixins: [VueThree.Object],

				props: {
					color: {},
				},

				computed: {
					object: function() {
						return new THREE.Mesh(
							new THREE.IcosahedronGeometry(1, 3),
							new THREE.MeshBasicMaterial({
								opacity: 1/8,
								transparent: true,
								vertexColors: THREE.VertexColors,
								wireframe: true,
							})
						);
					},
				},

				created: (function() {
					var watchComputed = [
						function() {
							this.object.material.color.set(this.color);
						},
					];
					return function() {
						watchComputed.forEach(function(func) {
							this.$watch(func);
						}, this);
					};
				})(),

				methods: {
					dispose: function(object) {
						object.geometry.dispose();
						object.material.dispose();
					},
				},
			},
		},
	});

})();
