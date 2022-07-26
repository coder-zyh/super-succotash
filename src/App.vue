<template>
	<router-view v-if="ready"></router-view>
	<div v-else class="full flex align-items-center justify-content-center">
		<van-loading vertical type="spinner" color="#1989fa">
			<div class="m-t-30">登录中...</div>
		</van-loading>
	</div>
</template>

<script lang="ts">
import { Notify, Toast } from "vant";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import { AppService } from "./api/services/app.service";
import { RootMutationType } from "./types/mutation.type";
import { UserInfo } from "./types/user.interface";

export default defineComponent({
	name: "App",
	computed: mapState(["ready"]),
	created() {
		new AppService().login("zzl12826c", "888888").subscribe({
			next: (data) => {
				this.$store.commit(RootMutationType.SET_READY, true);
				this.$store.commit(RootMutationType.UPDATE_USER, data);
			},
			error: (err) => Toast({ message: err, type: "fail" }),
		});
	},
});
</script>

<style lang="less">
@import "./assets/styles/index.less";
</style>
