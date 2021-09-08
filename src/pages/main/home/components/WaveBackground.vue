<template>
	<div class="component wave">
		<svg class="wave1" viewBox="0 0 1440 320">
			<path
				fill="#c2daf8"
				fill-opacity="1"
				d="M0,96L60,80C120,64,240,32,360,32C480,32,600,64,720,90.7C840,117,960,139,1080,128C1200,117,1320,75,1380,53.3L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
			></path>
		</svg>
		<svg class="wave2" viewBox="0 0 1440 320">
			<path
				fill="#0062ad"
				fill-opacity="1"
				d="M0,64L60,74.7C120,85,240,107,360,96C480,85,600,43,720,42.7C840,43,960,85,1080,112C1200,139,1320,149,1380,154.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
			></path>
		</svg>
	</div>
</template>

<script lang="ts">
import { onMounted, defineComponent } from "@vue/runtime-core";

import anime from "animejs/lib/anime.es.js";
export default defineComponent({
	name: "WaveBackground",
	setup() {
		const pathList = [
			"M0,64L60,74.7C120,85,240,107,360,96C480,85,600,43,720,42.7C840,43,960,85,1080,112C1200,139,1320,149,1380,154.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z",
			"M0,96L60,85.3C120,75,240,53,360,74.7C480,96,600,160,720,181.3C840,203,960,181,1080,149.3C1200,117,1320,75,1380,53.3L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z",
			"M0,0L60,21.3C120,43,240,85,360,96C480,107,600,85,720,74.7C840,64,960,64,1080,69.3C1200,75,1320,85,1380,90.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z",
		];

		onMounted(() => {
			anime({
				targets: ".wave1 > path",
				easing: "linear",
				duration: 16000,
				loop: true,
				d: [
					{ value: pathList[0] },
					{ value: pathList[1] },
					{ value: pathList[2] },
				],
			});

			anime({
				targets: ".wave2 > path",
				easing: "linear",
				duration: 15000,
				loop: true,
				d: [
					{ value: pathList[2] },
					{ value: pathList[0] },
					{ value: pathList[1] },
					{ value: pathList[2] },
				],
			});
		});
	},
});
</script>

<style lang="less" scoped>
.component.wave {
	position: relative;
	height: 50px;
	overflow: hidden;
	.wave1,
	.wave2 {
		position: absolute;
		left: 0;
	}
}
</style>
