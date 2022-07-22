<template>
	<div class="fill">
		<head-top>
			<template #left><span @click="cancel">取消</span></template>
			报销填报
			<template #right><span @click="save">保存</span></template>
		</head-top>
		<van-cell-group>
			<van-field
				v-model="project1"
				is-link
				readonly
				label="报销项目"
				placeholder="选择项目名称"
				@click="showPicker1 = true"
			/>
			<van-popup v-model:show="showPicker1" round position="bottom">
				<van-picker
					:columns="columns1"
					input-align="right"
					@cancel="showPicker1 = false"
					@confirm="onConfirm1"
				/>
			</van-popup>
			<van-field
				v-model="project2"
				is-link
				readonly
				label="报销类型"
				placeholder="选择报销类型"
				@click="showPicker2 = true"
			/>
			<van-popup v-model:show="showPicker2" round position="bottom">
				<van-picker
					:columns="columns2"
					input-align="right"
					@cancel="showPicker2 = false"
					@confirm="onConfirm2"
				/>
			</van-popup>
			<van-cell title="选择单个日期" :value="date" @click="show = true" />
			<van-calendar
				v-model:show="show"
				:min-date="minDate"
				:max-date="maxDate"
				:show-confirm="false"
				@confirm="onConfirm"
			/>
			<van-field
				v-model="money"
				label="报销金额"
				placeholder="请输入"
				input-align="right"
			/>
		</van-cell-group>
	</div>
</template>
<script lang="ts">
import HeadTop from "@/components/HeadTop.vue";
import { useRouter } from "vue-router";

import { defineComponent, ref } from "vue";

export default defineComponent({
	components: {
		HeadTop,
	},
	setup() {
		const app = {
			name: "myte",
			type: "report",
		};
		// 导入路由
		const router = useRouter();
		// 点击取消回到报销页面
		const cancel = () => {
			router.back();
		};
		// 点击保存调用接口
		const save = () => {
			console.log("save");
		};
		//项目选择
		//调用本地存储的可选项目列表
		const columns1 = JSON.parse(localStorage.getItem("projectList"));
		const project1 = ref("");
		const showPicker1 = ref(false);
		const onConfirm1 = (value) => {
			project1.value = value;
			showPicker1.value = false;
		};
		//调用本地存储的可选项目列表
		const columns2 = [
			"日常报销-业务招待",
			"日常报销-市内交通",
			"日常报销-团建费",
			"日常报销-参会及培训费",
			"日常报销-其他",
			"付款申请",
			"差旅报销",
		];
		const project2 = ref("");
		const showPicker2 = ref(false);
		const onConfirm2 = (value) => {
			project2.value = value;
			showPicker2.value = false;
		};
		// 日期选择
		const date = ref("");
		const show = ref(false);

		const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
		const onConfirm = (value) => {
			show.value = false;
			date.value = formatDate(value);
		};
		// 金额选择
		const money = 0;
		return {
			app,
			cancel,
			save,
			project1,
			showPicker1,
			onConfirm1,
			columns1,
			project2,
			showPicker2,
			onConfirm2,
			columns2,
			date,
			show,
			onConfirm,
			minDate: new Date(2022, 7, 1),
			maxDate: new Date(2022, 7, 31),
			money,
		};
	},
});
</script>
<style scoped>
.fill span {
	color: rgb(33, 33, 239);
}
</style>
