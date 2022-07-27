<template>
	<div class=""></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
</script>

<style lang="less" scoped></style>

<!-- <template>
	<div class="fill">
		<head-top>
			<template #left><span @click="cancel">取消</span></template>
			报销填报
			<template #right><span @click="save">提交</span></template>
		</head-top>
		<fill-item
			v-for="(item, index) in list"
			:key="index"
			ref="box"
			:index="index"
		></fill-item>
		<div class="btn">
			<van-button type="success" @click="createNew">点击添加</van-button>
			<van-button type="danger" @click="remove">点击删除</van-button>
		</div>
	</div>
</template> -->
<!-- <script lang="ts">
import HeadTop from "@/components/HeadTop.vue";
import FillItem from "./children/FillItem.vue";
import { useRouter } from "vue-router";
import { ref, defineComponent } from "vue";
import { CreateFeeForm } from "@/utils/class.js";

export default defineComponent({
	components: {
		HeadTop,
		FillItem,
	},
	setup() {
		// 导入路由
		const router = useRouter();
		// 点击取消回到报销页面
		const cancel = () => {
			router.back();
		};
		// 点击保存调用接口
		// 获取元素
		let box = ref(null);
		const save = () => {
			// 创建报销列表,添加数据到报销列表
			const fillForm = pushData();
			console.log(fillForm);
			// 发送post请求
			postList();
			// 跳转至fee页面
			router.replace("/fee");
		};
		const list = ref([{}]);
		const pushData = () => {
			const arr = [];
			box.value.forEach((item) => {
				const obj = new CreateFeeForm(
					item.project.split("-")[1],
					item.project.split("-")[0],
					item.feeType,
					item.date,
					item.money
				);
				arr.push(obj);
			});
			return arr;
		};
		const postList = () => {
			new Promise((resolve) => {
				setTimeout(() => {
					resolve("success-post");
				}, 2000);
			}).then((value) => {
				console.log(value);
			});
		};
		// 添加移除项目函数;
		const createNew = () => {
			list.value.push({});
		};
		const remove = () => {
			list.value.pop();
		};

		return {
			cancel,
			save,
			list,
			createNew,
			remove,
			box,
			pushData,
		};
	},
});
</script> -->
<!-- <style scoped>
.fill {
	min-height: 85vh;
}
.fill span {
	color: rgb(33, 33, 239);
}
.btn {
	display: flex;
	justify-content: space-around;
}
</style> -->
