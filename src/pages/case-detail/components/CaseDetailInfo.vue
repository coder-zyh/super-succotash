<template>
	<div class="component case-detail-info">
		<div class="case-detail-info__top">
			<div class="case-detail-info__bold">
				<span>贷款信息</span>
			</div>
			<div class="case-detail-info__top-item">
				<div>
					<div>客户编号</div>
					<div>{{ caseInfo.personalInfoPersonalNo }}</div>
				</div>
				<div>
					<div>签约合同号</div>
					<div>{{ caseInfo.loanDealNo }}</div>
				</div>
				<div>
					<div>贷款交易编号</div>
					<div>{{ caseInfo.caseNumber }}</div>
				</div>
				<div>
					<div>五级分类</div>
					<div>{{ caseInfo.levelFiveClass }}</div>
				</div>
				<div>
					<div>产品名称</div>
					<div>{{ caseInfo.prodBclass }}</div>
				</div>
				<div>
					<div>贷款金额（元）</div>
					<div>{{ caseInfo.loanAmount }}</div>
				</div>
				<div>
					<div>贷款余额折CNY（元）</div>
					<div>{{ caseInfo.loanBalCny }}</div>
				</div>
				<div>
					<div>执行年利率</div>
					<div>{{ caseInfo.yearRateStr }}</div>
				</div>
				<div>
					<div>贷款起始日</div>
					<div>{{ caseInfo.loanDate }}</div>
				</div>
				<div>
					<div>贷款到期日</div>
					<div>{{ caseInfo.loanEndDt }}</div>
				</div>
				<div>
					<div>还本频率</div>
					<div>{{ caseInfo.payWay }}</div>
				</div>
			</div>
		</div>
		<div class="case-detail-info__bottom">
			<div class="case-detail-info__bold">
				<span>逾期信息</span>
			</div>
			<div>
				<div class="case-detail-info__bottom-item">
					<div>
						<div>实际逾期本金折CNY（元）</div>
						<div>{{ caseInfo.actualOvdueAmt }}</div>
					</div>
					<div>
						<div>逾期前应收未收利息</div>
						<div>{{ caseInfo.dueShdRecInt }}</div>
					</div>
					<div>
						<div>AA罚息</div>
						<div>{{ caseInfo.defIntAmt }}</div>
					</div>
					<div>
						<div>AA复利</div>
						<div>{{ caseInfo.compIntAmt }}</div>
					</div>
					<div>
						<div>逾期总金额</div>
						<div>{{ caseInfo.overdueAmount }}</div>
					</div>
					<div>
						<div>欠息余额折CNY</div>
						<div>{{ caseInfo.oweIntBalCny }}</div>
					</div>
					<div>
						<div>挂息余额折CNY</div>
						<div>{{ caseInfo.hangIntBalCny }}</div>
					</div>
					<div>
						<div>逾期天数</div>
						<div>{{ caseInfo.overdueDays }}</div>
					</div>
					<div>
						<div>逾期阶段</div>
						<div>
							{{ caseInfo.overduePeriodStr }}
						</div>
					</div>
					<div>
						<div>最早逾期日期</div>
						<div>{{ caseInfo.dueDate }}</div>
					</div>
					<div>
						<div>最近还款金额（元）</div>
						<div>{{ caseInfo.latelyPayAmount }}</div>
					</div>
					<div>
						<div>最近还款日</div>
						<div>{{ caseInfo.latelyPayDate }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
//案件信息
import { AppService } from "@/api/services/app.service";
import { RequestParams } from "@gopowerteam/http-request";
import { defineComponent, ref, reactive, onMounted, inject } from "vue";
import { CaseInfoBase } from "@/types/caseInfo.interface";
import { CommonService } from "@/utils/common.service";
import { useDict, useFilter } from "@/utils/hook.service";
import { FilterService } from "@/utils/filter.service";
export default defineComponent({
	name: "CaseDetailInfo",
	setup() {
		const caseId = inject("caseId") as string;
		const caseInfo = reactive<CaseInfoBase>({
			personalInfoPersonalNo: null,
			caseNumber: null,
			loanDealNo: null,
			levelFiveClass: null,
			prodBclass: null,
			loanBalCny: null,
			yearRateStr: null,
			loanDate: null,
			loanEndDt: null,
			payWay: null,
			loanAmount: "0.00",
			// 逾期信息
			actualOvdueAmt: "0.00",
			dueShdRecInt: "0.00",
			defIntAmt: "0.00",
			compIntAmt: "0.00",
			overdueAmount: "0.00",
			oweIntBalCny: "0.00",
			hangIntBalCny: "0.00",
			overdueDays: null,
			overduePeriodStr: null,
			dueDate: null,
			latelyPayDate: null,
			latelyPayAmount: "0.00",
		});
		const service = new AppService();
		const dataSource = ref([]);
		function getdictService() {
			const dictService = useDict();
			dataSource.value = dictService.getDictData("Level5Type", "PayWay");
		}

		const filter = useFilter();

		onMounted(() => {
			getdictService();
			service.queryCaseInfo(new RequestParams({ caseId })).subscribe({
				next: (value: any) => {
					Object.keys(value).forEach((key) => {
						dataSource.value.forEach((item) => {
							if (item.code == value["levelFiveClass"]) {
								value["levelFiveClass"] = item.name;
							}
							if (item.code == value["payWay"]) {
								value["payWay"] = item.name;
							}
						});
						if (key == "overdueDate") {
							value["overdueDate"] = filter.dateFormat(value["overdueDate"]);
						}
						if (key == "loanDate") {
							value["loanDate"] = filter.dateFormat(value["loanDate"]);
						}
						if (key == "loanEndDt") {
							value["loanEndDt"] = filter.dateFormat(value["loanEndDt"]);
						}
						if (key == "dueDate") {
							value["dueDate"] = filter.dateFormat(value["dueDate"]);
						}
						if (key == "latelyPayDate") {
							value["latelyPayDate"] = filter.dateFormat(
								value["latelyPayDate"]
							);
						}
						if (key == "loanAmount" && value["loanAmount"]) {
							value["loanAmount"] = filter.toThousands(value["loanAmount"]);
						}
						if (key == "loanBal" && value["loanBal"]) {
							value["loanBal"] = filter.toThousands(value["loanBal"]);
						}
						if (key == "compIntAmt" && value["compIntAmt"]) {
							value["compIntAmt"] = filter.toThousands(value["compIntAmt"]);
						}
						if (key == "actualOvdueAmt" && value["actualOvdueAmt"]) {
							value["actualOvdueAmt"] = filter.toThousands(
								value["actualOvdueAmt"]
							);
						}
						if (key == "oweIntBalCny" && value["oweIntBalCny"]) {
							value["oweIntBalCny"] = filter.toThousands(value["oweIntBalCny"]);
						}
						if (key == "hangIntBalCny" && value["hangIntBalCny"]) {
							value["hangIntBalCny"] = filter.toThousands(
								value["hangIntBalCny"]
							);
						}
						if (key == "overdueAmount" && value["overdueAmount"]) {
							value["overdueAmount"] = filter.toThousands(
								value["overdueAmount"]
							);
						}
						if (key == "latelyPayAmount" && value["latelyPayAmount"]) {
							value["latelyPayAmount"] = filter.toThousands(
								value["latelyPayAmount"]
							);
						}
						if (key == "defIntAmt" && value["defIntAmt"]) {
							value["defIntAmt"] = filter.toThousands(value["defIntAmt"]);
						}
						if (key == "dueShdRecInt" && value["dueShdRecInt"]) {
							value["dueShdRecInt"] = filter.toThousands(value["dueShdRecInt"]);
						}
						if (key == "loanBalCny" && value["loanBalCny"]) {
							value["loanBalCny"] = filter.toThousands(value["loanBalCny"]);
						}
					});
					CommonService.revertData(caseInfo, value);
				},
			});
		});
		return {
			caseInfo,
		};
	},
});
</script>

<style lang="less" scoped>
.case-detail-info {
	background-color: #e2e2e2;
	padding-top: 2px;
	&__bold {
		font-weight: bold;
		font-size: 14px;
		line-height: 30px;
		background-color: #fff;
		color: #494949;
		padding-left: 14px;
		span {
			padding-left: 4px;
			border-left: 4px solid #0062ad;
		}
	}
	&__top-item > div {
		display: flex;
		color: #494949;
		justify-content: space-between;
		border-bottom: 1px solid #ebedf0;
		line-height: 30px;
		font-size: 14px;
		padding-left: 6px;
		div {
			margin: 0 10px;
		}
	}
	&__bottom {
		padding: 10px 0;
		&-item > div {
			display: flex;
			font-size: 14px;
			padding-left: 6px;
			color: #494949;
			justify-content: space-between;
			border-bottom: 1px solid #ebedf0;
			line-height: 30px;
			div {
				margin: 0 10px;
			}
		}
	}
}
</style>
