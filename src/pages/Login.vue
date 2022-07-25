<template>
	<van-loading type="spinner" color="#1989fa">登录中...</van-loading>
</template>

<script lang="ts">
import { AppService } from "@/api/services/app.service";
import { RootMutationType } from "@/types/mutation.type";
import { Toast } from "vant";
import { defineComponent } from "vue";

export default defineComponent({
	name: "LoginPage",
	created() {
		new AppService().login("zzl12826c", "888888").subscribe({
			next: (data) => {
				this.$store.commit(RootMutationType.SET_READY, true);
				this.$store.commit(RootMutationType.UPDATE_USER, data);
				this.$router.push("/report");
			},
			error: (err) => Toast({ message: err, type: "fail" }),
		});
	},
});
</script>

<style lang="less" scoped></style>
