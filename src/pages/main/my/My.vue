<template>
	<div class="page_content my">
		<zw-nav-bar hidden-left title="我的"></zw-nav-bar>
		<div class="my_content">
			<div class="my_content-img">
				<van-image round width="6rem" height="6rem" :src="avatorImg" />
			</div>
			<div class="my_content-name">
				<span>您好，{{ realName }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import femaleHead from "@/assets/imgs/femalHead.png";
import maleHead from "@/assets/imgs/maleHead.png";
import { useStore } from "@/store";
export default defineComponent({
	name: "MyPage",
	setup() {
		const store = useStore();
		const realName = store.state.user.realName;
		const avatorImg = computed(() =>
			store.state.user.gender === "1" ? maleHead : femaleHead
		);
		return {
			realName,
			avatorImg,
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
