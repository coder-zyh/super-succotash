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
		<div class="my_logout">
			<van-button size="large" type="danger" @click="logout">
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
	name: "MyPage",
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
	.my_logout {
		margin-top: 30vh;
	}
}
</style>
