<template>
	<div class="page report">
		<!-- 时间选择器 -->
		<ReportDate
			:date="selectDate"
			@update:date="onDateChange"
			@append="addItem"
		/>

		<!-- 项目列表 -->
		<div
			v-for="(item, index) in projectList"
			:key="item.id"
			class="report_item"
		>
			<div
				class="report_item__title flex justify-content-between align-items-center"
			>
				<div>项目({{ index + 1 }})</div>
				<delete-button
					:hidden="index == 0"
					@click="() => deleteProject(item.id)"
				/>
			</div>
			<ReportItem
				:id="item.id"
				v-model:timeCount="item.timeCount"
				:total-amount="item.totalAmount"
				:name="item.name"
				@click="onProjectEvent"
			/>
		</div>

		<!-- 展示总计 -->
		<van-cell-group v-if="projectList.length > 1" title="合计">
			<van-cell title="合计工时" :value="totalTimes"></van-cell>
			<van-cell title="合计预估费用" :value="totalAmount"></van-cell>
		</van-cell-group>

		<div class="report_bottom">
			<van-button type="primary" round block @click="submit">提交</van-button>
		</div>

		<van-popup v-model:show="showPicker" position="bottom">
			<ProjectPicker
				@cancel="onProjectEvent('project')"
				@confirm="onProjectPicked"
			/>
		</van-popup>

		<van-popup :show="showFees" position="bottom" class="report_fees">
			<ReportFee
				ref="feeRef"
				:pid="porjectId"
				@cancel="onProjectEvent('fee')"
				@confirm="onFeeFinsh"
			/>
		</van-popup>
	</div>
</template>
<script lang="ts">
import ReportItem from "./components/ReportItem.vue";
import { ProjectItem, FeeItem } from "@/types/project.interface";
import { ref, defineComponent, nextTick, computed } from "vue";
import { useFilter } from "@/utils/hook.service";
import ReportDate from "./components/ReportDate.vue";
import ProjectPicker from "@/components/ProjectPicker.vue";
import ReportFee from "./components/ReportFee.vue";
import { Notify, Toast } from "vant";
import DeleteButton from "./components/DeleteButton.vue";
import { AppService } from "@/api/services/app.service";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "Report",
	components: {
		ReportDate,
		ReportItem,
		ProjectPicker,
		ReportFee,
		DeleteButton,
	},
	setup() {
		const filter = useFilter();
		const selectDate = ref("");
		const today = filter.dateFormat(new Date());
		selectDate.value = today;

		const showPicker = ref(false);
		const showFees = ref(false);

		const projectList = ref<ProjectItem[]>([]);
		const porjectId = ref("");
		const feeRef = ref();
		const router = useRouter();

		// 添加新项目
		const addItem = () => {
			projectList.value.push({
				id: Date.now().toString(),
				code: "",
				name: "",
				timeCount: 8,
				date: selectDate.value,
			});
		};

		// 默认添加一条
		addItem();

		// 填报日期选择
		const onDateChange = (dateStr: string) => {
			selectDate.value = dateStr;
			projectList.value.forEach((x) => (x.date = dateStr));
		};

		// 项目点击事件
		const onProjectEvent = (type: "project" | "fee", pid?: string) => {
			porjectId.value = pid || "";
			if (type === "fee") {
				showFees.value = pid ? true : false;
			} else {
				showPicker.value = pid ? true : false;
			}
		};

		// 项目选中后保存
		const onProjectPicked = (param: PickerResult) => {
			const project = projectList.value.find((x) => x.id === porjectId.value);
			if (!project) return;
			project.name = param.text;
			project.code = param.value;
			onProjectEvent("project");
		};

		// 费用项保存
		const onFeeFinsh = (amount: number) => {
			const project = projectList.value.find((x) => x.id === porjectId.value);
			if (!project) return;
			project.totalAmount = amount;
			onProjectEvent("fee");
		};

		// 删除选填项目
		const deleteProject = (pid: string) => {
			const index = projectList.value.findIndex((x) => x.id === pid);
			projectList.value.splice(index, 1);
			// 删除费用项
			if (feeRef.value != undefined) {
				nextTick(() => feeRef.value.deleteFees(pid));
			}
		};

		const totalTimes = computed(() =>
			projectList.value.reduce((s, c) => s + (c.timeCount || 0), 0)
		);
		const totalAmount = computed(() =>
			projectList.value.reduce((s, c) => s + (c.totalAmount || 0), 0)
		);

		// 最终保存
		const submit = () => {
			if (totalTimes.value < 8) {
				return Notify({
					message: "总时间不能小于8小时",
				});
			}
			if (totalTimes.value > 24) {
				return Notify({
					message: "总时间不能超过24小时",
				});
			}

			// check project list
			const hasEmpty = projectList.value.some((x) => !x.code || !x.timeCount);
			if (hasEmpty) {
				return Notify({
					message: "请完善填写填报信息",
				});
			}

			// 组合数据
			let feeList: any[] = [];
			if (feeRef.value !== undefined) {
				feeList = feeRef.value.dataSet;
			}

			const mobileCardList = projectList.value.map((project) => {
				const item: any = {};
				item.assignmentId = project.code;
				item.day = project.timeCount;

				const fees = feeList.filter((x) => x.id === project.id);
				if (fees.length) {
					item.mobileCardList = fees.map((fee) => {
						return {
							assignmentId: project.code,
							fromDate: selectDate.value,
							amount: fee.amount,
							expensetypeid: fee.type,
						};
					});
				}
				return item;
			});

			const requestData = {
				peroId: selectDate.value,
				mobileCardList,
			};
			new AppService().saveDayReport(requestData).subscribe({
				next: () => {
					Toast({
						message: "填报成功",
						type: "success",
						onClose: () => router.push("/"),
					});
				},
				error: (err) =>
					Notify({
						message: err,
					}),
			});
		};

		return {
			selectDate,
			projectList,
			porjectId,
			showPicker,
			showFees,
			feeRef,
			totalTimes,
			totalAmount,
			// functon
			addItem,
			submit,
			onDateChange,
			deleteProject,
			onProjectEvent,
			onProjectPicked,
			onFeeFinsh,
		};
	},
});
</script>
<style lang="less" scoped>
.report {
	&_item {
		&__title {
			padding: 22px 16px 10px 16px;
			color: #999;
			font-size: 12px;
		}
		&__button {
			background: transparent;
		}
	}
	&_bottom {
		background: #fff;
		padding: 32px 16px 16px 16px;
	}
}
</style>
