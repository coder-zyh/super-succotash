<template>
	<div class="page my flex-column justify-content-between">
		<div class="my_content flex-column justify-content-center">
			<div class="my_content-img">
				<van-image round width="6rem" height="6rem" :src="avatorImg" />
			</div>
			<div class="my_content-name">
				<span>您好，{{ realName }}</span>
			</div>
		</div>
		<div class="my_bottom">
			<van-button block type="danger" plain @click="logout">
				退出登录
			</van-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import femaleHead from "@/assets/imgs/femalHead.png";
import maleHead from "@/assets/imgs/maleHead.png";
import { useStore } from "@/store";
import { RootMutationType } from "@/types/mutation.type";
import { useRouter } from "vue-router";
export default defineComponent({
	setup() {
		const store = useStore();
		const router = useRouter();
		const realName = store.state.user.realName;
		const avatorImg = computed(() =>
			store.state.user.gender === "男" ? maleHead : femaleHead
		);
		const logout = () => {
			store.commit(RootMutationType.SET_READY, false);
			store.commit(RootMutationType.UPDATE_USER, {
				realName: "",
				username: "",
				phone: "",
				gender: "",
				isAdmin: false,
				email: "",
			});
			router.push("/");
		};
		return {
			realName,
			avatorImg,
			logout,
		};
	},
});
</script>

<style lang="less" scoped>
.my {
	height: calc(100vh - var(--van-tabbar-height));
	background-color: #fff;
	.my_content {
		height: 400px;
		background-color: #64a1eb;
		text-align: center;
		color: #fff;
		&-name {
			margin-top: 3vh;
		}
	}
	&_bottom {
		padding-bottom: 20px;
	}
}
</style>
