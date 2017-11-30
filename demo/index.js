(function() {

	new Vue({
		el: '#App',

		data: function() {
			var defaultCameraPosition = [0, 0, 5/2];
			var defaultCameraQuaternion = [0, 0, 0, 1];

			return {
				backgroundColor: '#1a3041',
				lightPosition: [1, 1, 1],
				defaultCameraPosition: defaultCameraPosition,
				cameraPosition: defaultCameraPosition,
				defaultCameraQuaternion: defaultCameraQuaternion,
				cameraQuaternion: defaultCameraQuaternion,
				controlsEnabled: true,
			};
		},

		computed: {
			points: function() {
				var returns = [];
				for (var i = 0; i < 100; ++i) {
					var point = {
						position: (new THREE.Vector3(Math.random(), Math.random(), Math.random()))
							.subScalar(1/2)
							.setLength(Math.random())
							.toArray(),
						scale: 1/200 + Math.random() * 1/200,
					};
					returns.push(point);
				}
				return returns;
			},

			threeSphereHelper: function() {
				return {
					component: 'mySphereHelper',
					props: {
						color: '#a0a0a0'
					},
				};
			},

			threePoints: function() {
				var points = this.points;

				var returns = {};
				points.forEach(function(point, pointIndex) {
					var threePointKey = ''+pointIndex;
					var threePoint = {
						component: 'myPoint',
						props: {
							color: '#a0a0a0',
							position: point.position,
							scale: point.scale,
							userData: {
								name: 'point',
								pointIndex: pointIndex,
							},
						},
					};
					returns[threePointKey] = threePoint;
				});
				return returns;
			},

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
					returns['point'+'.'+key] = object;
				});
				return returns;
			},
		},

		methods: {
			resetCamera: function() {
				this.cameraPosition = this.defaultCameraPosition;
				this.cameraQuaternion = this.defaultCameraQuaternion;
			},
		},

		components: {
			mySphereHelper: {
				mixins: [VueThree.Object3D],
				render: VueThree.Object3D.render,

				props: {
					color: {},
				},

				beforeCreate: function() {
					Object.entries({
						setMaterialColor: function() {
							this.object.material.color.set(this.color);
						},
					}).forEach(function(entry) {
						var key = entry[0];
						var fn = entry[1];
						this.$options.computed[key] = fn;
						this.$options.watch[key] = function() {};
					}.bind(this));
				},

				beforeDestroy: function() {
					this.object.geometry.dispose();
					this.object.material.dispose();
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

				watch: {},

				methods: {
					dispose: function(object) {
						object.geometry.dispose();
						object.material.dispose();
					},
				},
			},

			myPoint: {
				mixins: [VueThree.Object3D],
				render: VueThree.Object3D.render,

				props: {
					color: {},
				},

				beforeCreate: function() {
					Object.entries({
						setMaterialEmissive: function() {
							this.object.material.emissive.set(this.color);
						},
					}).forEach(function(entry) {
						var key = entry[0];
						var fn = entry[1];
						this.$options.computed[key] = fn;
						this.$options.watch[key] = function() {};
					}.bind(this));
				},

				computed: {
					object: function() {
						return new THREE.Mesh(
							new THREE.SphereBufferGeometry(1/2, 24, 24),
							new THREE.MeshStandardMaterial({metalness: 2/3, roughness: 2/3})
						);
					},
				},

				watch: {},

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