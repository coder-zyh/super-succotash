<template>
	<van-nav-bar
		class="component zw-nav-bar"
		fixed
		left-arrow
		:right-text="actionText"
		:title="title"
		@click-left="back"
		@click-right="$emit('action')"
	>
		<template v-if="hiddenLeft" #left></template>
	</van-nav-bar>
</template>

<script lang="ts">
import { computed, defineComponent, defineEmit } from "vue";
import { NavBar } from "vant";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
	name: "ZwNavBar",
	components: {
		[NavBar.name]: NavBar,
	},
	props: {
		hiddenLeft: Boolean,
		actionText: String,
	},
	emits: ["action"],
	setup(props) {
		const showLeft = computed(() => !props.hiddenLeft);
		const { meta } = useRoute();
		const { back } = useRouter();
		return {
			showLeft,
			title: meta.title || "",
			back,
		};
	},
});
</script>

<style lang="less" scoped>
.zw-nav-bar {
	background-color: #0062ad;
}
:deep(.van-icon) {
	color: #fefefe;
}
:deep(.van-nav-bar__title) {
	color: #fefefe;
}
:deep(.van-nav-bar__right) {
	.van-nav-bar__text {
		color: #fefefe;
	}
}
</style>
