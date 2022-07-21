<template>
	<div class="page my">
		<head-top>我的</head-top>
		<div class="my_content">
			<div class="my_content-img">
				<van-image round width="6rem" height="6rem" :src="headpor" />
			</div>
			<div class="my_content-name">
				<span>您好，{{ realName }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import headpor from "@/assets/imgs/headpor.png";
import HeadTop from "@/components/HeadTop.vue";
export default defineComponent({
	name: "MyPage",
	// eslint-disable-next-line vue/no-unused-components
	components: { HeadTop },
	setup() {
		const realName = window.sessionStorage.getItem("realName");
		return {
			realName,
			headpor,
		};
	},
});
</script>

<style lang="less" scoped>
.my_content {
	height: 40vh;
	background-color: #64a1eb;
	text-align: center;
	color: #fff;
	&-img {
		padding-top: 10vh;
	}
	&-name {
		margin-top: 3vh;
	}
}
</style>
