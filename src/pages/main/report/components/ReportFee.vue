<template>
	<div class="component report-fee flex-column">
		<van-nav-bar title="添加预估费用" right-text="保存" @click-right="onSave" />

		<!-- 内容list -->
		<van-form input-align="right" class="report-fee_items flex-span-1">
			<div v-for="(item, index) of list" :key="item.id" class="report-fee_item">
				<div
					class="report-fee_item__title flex justify-content-between align-items-center"
				>
					<div>预估费用 ({{ index + 1 }})</div>
					<delete-button @click="() => removeItem(item.id)" />
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
import { AppService } from "@/api/services/app.service";
import DeleteButton from "./DeleteButton.vue";

const typeList = ref<PickerResult[]>([]);

new AppService().getExpenseType().subscribe({
	next: (data) => {
		typeList.value = data.map((x) => ({
			text: x.name,
			value: x.id,
		}));
	},
});

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
// 保存当前编辑费用
const onSave = () => {
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
