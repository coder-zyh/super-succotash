<template>
	<router-view v-if="ready"></router-view>
	<div v-else class="full flex align-items-center justify-content-center">
		<van-loading vertical type="spinner" color="#1989fa">
			<div class="m-t-30">登录中...</div>
		</van-loading>
	</div>
</template>

<script lang="ts">
import { RequestParams } from "@gopowerteam/http-request";
import { defineComponent } from "vue";
import { mapState } from "vuex";
import { AppService } from "./api/services/app.service";
import { RootMutationType } from "./types/mutation.type";
export default defineComponent({
	name: "App",
	computed: mapState(["ready"]),
	watch: {
		ready: function (value: boolean) {
			if (!value) return;
			new AppService().getAll(new RequestParams()).subscribe({
				next: (value: any) => {
					this.$store.commit(RootMutationType.SET_DICTDATA, value);
				},
			});
		},
	},
});
</script>

<style lang="less">
@import "./assets/styles/index.less";
</style>
