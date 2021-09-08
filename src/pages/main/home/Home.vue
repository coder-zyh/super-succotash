<template>
	<div class="page home">
		<div class="page_content">
			<HomeTop
				:total-money="totalInfo.overdueAmount"
				:risk-count="totalInfo.caseCountRisk"
				:overdue-count="totalInfo.caseCountOverdue"
				:case-count="totalInfo.caseCountTotal"
			/>
			<div class="home-footer">
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
		</div>
	</div>
</template>

<script lang="ts">
import { AppService } from "@/api/services/app.service";
import { RequestParams } from "@gopowerteam/http-request";
import { defineComponent, ref, reactive, onMounted, computed } from "vue";
import { CountInfo } from "@/types/home.interface";
import { store, key } from "@/store";
import { useFilter } from "@/utils/hook.service";
import HomeTop from "./components/HomeTop.vue";

export default defineComponent({
	name: "Home",
	components: {
		HomeTop,
	},
	setup() {
		const currentRate = ref(0);
		const gradientColor = {
			"0%": "#3fecff",
			"100%": "#6149f6",
		};
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
			gradientColor,
		};
	},
});
</script>

<style lang="less" scoped>
.page_content {
	padding: 0;
}
.home-top {
	text-align: center;
	&__svgstyle {
		width: 100%;
		line-height: 30px;
		div:nth-child(1) {
			font-size: 30px;
			line-height: 60px;
			margin-top: 50px;
		}
	}
	&__content {
		display: flex;
		justify-content: space-around;
		text-align: center;
	}
}
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

<style lang="less">
.home .home-footer {
	.van-cell {
		margin-bottom: 8px;
		box-shadow: 0px 3px 7px 0px rgba(140, 140, 140, 0.35);
		border-radius: 3px;
		padding-left: 10px;
		color: #3d3d3d;
		&__value {
			color: #3d3d3d;
		}
	}
}
</style>
