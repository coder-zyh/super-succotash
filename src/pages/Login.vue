<template>
	<div class="full login flex-column justify-content-center">
		<van-form label-align="center" class="login_form" @submit="login">
			<van-field
				v-model="userName"
				label="工号"
				:rules="[{ required: true, message: '请填写工号' }]"
			></van-field>
			<van-field
				v-model="passWord"
				label="密码"
				type="password"
				:rules="[{ required: true, message: '请填写密码' }]"
			></van-field>
			<van-button class="login_btn" type="primary" block native-type="submit">
				登录
			</van-button>
		</van-form>
	</div>
</template>

<script lang="ts" setup>
import { AppService } from "@/api/services/app.service";
import { RootMutationType } from "@/types/mutation.type";
import { Toast } from "vant";
import { useStore } from "@/store";
import { useRouter } from "@/router";
import { ref, onBeforeMount } from "vue";

const store = useStore();
const router = useRouter();

const userName = ref("");
const passWord = ref("");

onBeforeMount(() => {
	localStorage.clear();
});

const login = () => {
	new AppService().login(userName.value, passWord.value).subscribe({
		next: (data) => {
			store.commit(RootMutationType.SET_READY, true);
			store.commit(RootMutationType.UPDATE_USER, data);
			router.replace("/index/report");
		},
		error: (err) => Toast({ message: err, type: "fail" }),
	});
};
</script>

<style lang="less" scoped>
.login {
	background: url("/images/login_logo.png") center top / cover,
		url("/images/login_bg.png") center / cover;
	&_form {
		margin: 0 16px;

		:deep(.van-cell) {
			background: transparent;
			&__title {
				color: #f1f1f1;
				letter-spacing: 10px;
			}
			&__avlue {
				position: relative;
			}
			.van-field__control {
				color: #fff !important;
			}
			.van-field__error-message {
				position: absolute;
				top: 0;
				right: 0;
				color: #f77;
			}
		}
	}

	&_btn {
		margin-top: 30px;
	}
}
</style>
