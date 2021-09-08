<template>
	<van-loading type="spinner" color="#1989fa">登录中...</van-loading>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
	name: "Login",
	mounted() {
		setTimeout(() => {
			this.$router.replace({ name: "home" });
		}, 3000);
	},
});
</script>

<style lang="less" scoped></style>
