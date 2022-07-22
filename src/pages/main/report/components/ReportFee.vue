<template>
	<div class="component report-fee flex-column">
		<van-nav-bar
			title="添加预估费用"
			left-text="取消"
			:right-text="list.length ? '保存' : ''"
			@click-left="onCancel"
			@click-right="onConfirm"
		/>

		<!-- 内容list -->
		<van-form input-align="right" class="report-fee_items flex-span-1">
			<div v-for="(item, index) of list" :key="item.id" class="report-fee_item">
				<div
					class="report-fee_item__title flex justify-content-between align-items-center"
				>
					<div>预估费用 ({{ index + 1 }})</div>
					<van-button
						type="primary"
						plain
						size="mini"
						@click="() => removeItem(item.id)"
					>
						删除
					</van-button>
				</div>
				<van-field
					label="费用类型"
					:model-value="item.typeText"
					placeholder="选择费用类型"
					readonly
					is-link
					@click="feeTypeClick(item.id)"
				></van-field>
				<van-field v-model="item.amount" label="预估金额">
					<template #right-icon>
						<span>元</span>
					</template>
				</van-field>
			</div>
		</van-form>

		<van-popup v-model:show="showTypePicker" position="bottom">
			<van-picker
				title="费用类型选择"
				:columns="typeList"
				@cancel="showTypePicker = false"
				@confirm="onTypePicked"
			></van-picker>
		</van-popup>

		<div class="report-fee_btn">
			<van-button type="primary" plain block @click="addNewItem">
				增加预估费用
			</van-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from "vue";
import { FeeItem } from "@/types/project.interface";
import { Toast } from "vant";

const typeList = [
	{
		id: 21,
		name: "日常报销-业务招待",
		comment: "业务招待产生的费用（含出差过程中发生的业务招待费）",
		createdate: "2021/09/17 16:07:07",
		createdby: "管理员",
		updatedate: "2021/09/17 16:07:07",
		updatedby: "管理员",
		status: 1,
	},
	{
		id: 22,
		name: "日常报销-市内交通",
		comment: "含加班打车及其他外出交通报销，不含差旅市内交通",
		createdate: "2021/09/17 16:07:41",
		createdby: "管理员",
		updatedate: "2021/09/17 16:07:41",
		updatedby: "管理员",
		status: 1,
	},
	{
		id: 23,
		name: "日常报销-加班餐",
		comment: "日常加班餐报销",
		createdate: "2021/09/17 16:08:44",
		createdby: "管理员",
		updatedate: "2021/09/17 16:09:02",
		updatedby: "管理员",
		status: 1,
	},
	{
		id: 24,
		name: "日常报销-团建费",
		comment: "一般仅指由项目经理或者直属领导申请并报销",
		createdate: "2021/09/17 16:09:27",
		createdby: "管理员",
		updatedate: "2021/09/17 16:09:27",
		updatedby: "管理员",
		status: 1,
	},
	{
		id: 25,
		name: "日常报销-参会及培训费",
		comment: "一般对公支付，特殊情况个人垫付产生的报销费用",
		createdate: "2021/09/17 16:09:46",
		createdby: "管理员",
		updatedate: "2021/09/17 16:09:46",
		updatedby: "管理员",
		status: 1,
	},
	{
		id: 26,
		name: "日常报销-其他",
		comment: "",
		createdate: "2021/09/17 16:09:59",
		createdby: "管理员",
		updatedate: "2021/09/17 16:09:59",
		updatedby: "管理员",
		status: 1,
	},
	{
		id: 32,
		name: "付款申请",
		comment: "",
		createdate: "2021/09/17 16:12:03",
		createdby: "管理员",
		updatedate: "2021/09/17 16:12:03",
		updatedby: "管理员",
		status: 1,
	},
	{
		id: 33,
		name: "差旅报销",
		comment: "包含住宿费、长途交通、市内交通、退票费托运费保险费",
		createdate: "2021/09/18 16:07:30",
		createdby: "管理员",
		updatedate: "2021/09/18 16:09:20",
		updatedby: "管理员",
		status: 1,
	},
].map((x) => ({
	text: x.name,
	value: x.id,
}));

const props = defineProps({
	pid: {
		type: String,
		required: true,
	},
});

const showTypePicker = ref(false);

let feeItemId = "";
// 点击费用项时选择费用类型
const feeTypeClick = (id: string) => {
	feeItemId = id;
	showTypePicker.value = true;
};
// 费用项选择完毕
const onTypePicked = (param: PickerResult) => {
	const item = list.value.find((x) => x.id === feeItemId);
	if (item) {
		item.typeText = param.text;
		item.type = param.value;
	}
	showTypePicker.value = false;
};

const emits = defineEmits(["cancel", "confirm"]);

// 本次填报的所有费用项
const dataSet = ref<Array<FeeItem & { typeText: string }>>([]);

// 显示当前项目的费用项
const list = computed(() =>
	dataSet.value.filter((x) => x.projectId === props.pid)
);

// 删除费用项
const removeItem = (id: string) =>
	dataSet.value.splice(
		dataSet.value.findIndex((x) => x.id === id),
		1
	);

// 添加一个新的费用项
const addNewItem = () => {
	dataSet.value.push({
		id: Date.now().toString(),
		projectId: props.pid, // 暂时先用id 代替code, 可能先填写费用，再选code
		type: "",
		amount: "",
		typeText: "",
	});
};

// 取消费用填报
const onCancel = () => {
	for (let index = dataSet.value.length - 1; index >= 0; index--) {
		const item = dataSet.value[index];
		if (item.projectId === props.pid && !item.type && !item.amount) {
			dataSet.value.splice(index, 1);
		}
	}
	nextTick(() => emits("cancel"));
};
// 保存当前编辑费用
const onConfirm = () => {
	let sumAmout = 0;
	const noError = list.value.every((x) => {
		if (x.type === "") {
			Toast({
				message: "请选择费用类型",
				type: "text",
			});
			return false;
		}
		const amount = Number.parseInt(x.amount);
		if (Number.isNaN(amount)) {
			Toast({
				message: "请输入预估费用",
				type: "text",
			});
			return false;
		}
		sumAmout += amount;
		return true;
	});

	noError && emits("confirm", sumAmout);
};

// 根据项目ID删除已经填写的费用项
const deleteFees = (pid: string) => {
	for (let index = dataSet.value.length - 1; index >= 0; index--) {
		if (dataSet.value[index].projectId === pid) {
			dataSet.value.splice(index, 1);
		}
	}
};

defineExpose({
	dataSet,
	deleteFees,
});
</script>

<style lang="less" scoped>
.report-fee {
	height: 60vh;
	&_btn {
		padding: 8px 0 2px;
	}
	&_items {
		overflow-y: auto;
	}
	&_item__title {
		padding: 20px 16px 12px 16px;
		background-color: #f1f1f1;
		font-size: 12px;
		color: #999;
	}
}
</style>
