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
import { computed, defineComponent } from "vue";
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
			back: props.hiddenLeft ? undefined : back,
		};
	},
});
</script>

<style lang="less" scoped></style>
