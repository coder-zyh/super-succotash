<template>
	<div class="page home">
		<van-list>
			<van-cell
				title="今日新增逾期案件数"
				:value="totalInfo.caseCountOverdueNew"
			/>
			<van-cell
				title="今日跟进逾期案件数"
				:value="totalInfo.caseCountOverdueFollow"
			/>
			<van-cell
				title="待跟进逾期案件数"
				:value="totalInfo.caseCountOverdueWaitFollow"
			/>
			<van-cell
				title="今日新增风险案件数"
				:value="totalInfo.caseCountRiskNew"
			/>
			<van-cell
				title="今日跟进风险案件数"
				:value="totalInfo.caseCountRiskFollow"
			/>
			<van-cell
				title="待跟进风险案件数"
				:value="totalInfo.caseCountRiskWaitFollow"
			/>
		</van-list>
	</div>
</template>

<script lang="ts">
import { AppService } from "@/api/services/app.service";
import { RequestParams } from "@gopowerteam/http-request";
import { defineComponent, ref, reactive, onMounted, computed } from "vue";
import { CountInfo } from "@/types/home.interface";
import { store, key } from "@/store";
import { useFilter } from "@/utils/hook.service";

export default defineComponent({
	name: "HomePage",
	setup() {
		const currentRate = ref(0);
		const totalInfo = reactive<CountInfo>({
			overdueAmount: "",
			caseCountRisk: 0,
			caseCountOverdue: 0,
			caseCountTotal: 0,
			caseCountOverdueNew: 0,
			caseCountOverdueFollow: 0,
			caseCountOverdueWaitFollow: 0,
			caseCountRiskNew: 0,
			caseCountRiskFollow: 0,
			caseCountRiskWaitFollow: 0,
		});

		const service = new AppService();
		const filter = useFilter();
		// const amount1 = computed(() => totalInfo.overdueAmount.match(m.match(/([\d,]*)(.*)/)))

		onMounted(() => {
			service.getWaitCaseAmount(new RequestParams()).subscribe({
				next: (value: number) => {
					totalInfo.overdueAmount = filter.toThousands(value);
				},
			});
			service.getRiskCaseTotal(new RequestParams()).subscribe({
				next: (value: number) => (totalInfo.caseCountRisk = value),
			});
			service.getOverdueCaseTotal(new RequestParams()).subscribe({
				next: (value: number) => (totalInfo.caseCountOverdue = value),
			});
			service.getAllCaseTotal(new RequestParams()).subscribe({
				next: (value: number) => (totalInfo.caseCountTotal = value),
			});
			service
				.getNewlyCaseCount(new RequestParams({ departmentType: "VISIT" }))
				.subscribe({
					next: (value: number) => (totalInfo.caseCountOverdueNew = value),
				});
			service
				.getNewFollowupCaseCount(new RequestParams({ departmentType: "VISIT" }))
				.subscribe({
					next: (value: number) => (totalInfo.caseCountOverdueFollow = value),
				});
			service
				.getNewWaitFollowupCount(new RequestParams({ departmentType: "VISIT" }))
				.subscribe({
					next: (value: number) =>
						(totalInfo.caseCountOverdueWaitFollow = value),
				});
			service
				.getNewlyCaseCount(new RequestParams({ departmentType: "RISK" }))
				.subscribe({
					next: (value: number) => (totalInfo.caseCountRiskNew = value),
				});
			service
				.getNewFollowupCaseCount(new RequestParams({ departmentType: "RISK" }))
				.subscribe({
					next: (value: number) => (totalInfo.caseCountRiskFollow = value),
				});
			service
				.getNewWaitFollowupCount(new RequestParams({ departmentType: "RISK" }))
				.subscribe({
					next: (value: number) => (totalInfo.caseCountRiskWaitFollow = value),
				});
		});

		return {
			totalInfo,
			currentRate,
		};
	},
});
</script>

<style lang="less" scoped>
.home-footer {
	padding: 15px;
	div {
		span {
			display: inline-block;
		}
		span:nth-child(1) {
			width: 70%;
		}
	}
}
</style>
