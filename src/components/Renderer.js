import THREE from 'three';

import Function_noop from '../helpers/Function/noop';

export default {
	name: 'VueThreeRenderer',

	render(createElement) {
		return createElement('div', {
			style: {
				width: '100%',
				height: '100%',
				overflow: 'hidden',
			},
		}, this.$slots.default);
	},

	props: {
		antialias: {
			type: Boolean,
			default: true,
		},
		alpha: {
			type: Boolean,
			default: false,
		},
		renderSceneInterval: {
			type: Number,
			default: 1000 / 60,
		},
		updateContainerSizeInterval: {
			type: Number,
			default: 1000,
		},
	},

	data() {
		return {
			containerWidth: 0,
			containerHeight: 0,
			frozen$renderer: Object.freeze({
				o: new THREE.WebGLRenderer({
					alpha: this.alpha,
					antialias: this.alpha,
				}),
			}),
			frozen$scene: {o: null},
			frozen$camera: {o: null},
		};
	},

	beforeCreate() {
		Object.entries({
			updateRendererSize() {
				this.renderer.setSize(this.containerWidth, this.containerHeight);
				if (this.containerWidth > 0 && this.containerHeight > 0) {
					if (this.camera) {
						this.camera.aspect = this.containerWidth / this.containerHeight;
						this.camera.updateProjectionMatrix();
					}
				}
			},
		}).forEach(([key, fn]) => {
			this.$options.computed[key] = fn;
			this.$options.watch[key] = Function_noop;
		});
	},

	mounted() {
		this.$el.appendChild(this.renderer.domElement);
		this.updateContainerSizeScheduler();
		this.renderSceneScheduler();
	},

	computed: {
		renderer() {
			return this.frozen$renderer.o;
		},

		scene: {
			get() {
				return this.frozen$scene.o;
			},

			set(o) {
				return this.frozen$scene = Object.freeze({o});
			},
		},

		camera: {
			get() {
				return this.frozen$camera.o;
			},

			set(o) {
				return this.frozen$camera = Object.freeze({o});
			},
		},

		updateContainerSizeScheduler() {
			return function() {
				if (!this._isDestroyed) {
					setTimeout(() => {
						requestAnimationFrame(() => {
							this.updateContainerSizeScheduler();
						});
					}, this.updateContainerSizeInterval);
					this.updateContainerSize();
				}
			};
		},

		renderSceneScheduler() {
			return function() {
				if (!this._isDestroyed) {
					setTimeout(() => {
						requestAnimationFrame(() => {
							this.renderSceneScheduler();
						});
					}, this.renderSceneInterval);
					this.renderScene();
				}
			};
		},
	},

	watch: {},

	methods: {
		updateContainerSize() {
			let {width, height} = this.$el.getBoundingClientRect();
			this.containerWidth = width;
			this.containerHeight = height;
		},

		renderScene() {
			if (this.scene && this.camera) {
				this.renderer.render(this.scene, this.camera);
			}
		},
	},
};