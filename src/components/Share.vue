<template>
	<van-cell title="显示分享面板" @click="showShare = true" />
	<van-share-sheet
		v-model:show="showShare"
		title="立即分享给好友"
		:options="options"
		@select="onSelect"
	/>
</template>

<script lang="ts">
import { ref } from "vue";
import { Toast } from "vant";

export default {
	name: "Share",
	components: {},
	setup() {
		const showShare = ref(false);
		const options = [
			{ name: "微信", icon: "wechat" },
			{ name: "微博", icon: "weibo" },
			{ name: "复制链接", icon: "link" },
			{ name: "分享海报", icon: "poster" },
			{ name: "二维码", icon: "qrcode" },
		];

		const onSelect = (option: any) => {
			Toast(option.name);
			showShare.value = false;
		};

		return {
			options,
			onSelect,
			showShare,
		};
	},
};
</script>

<style></style>
