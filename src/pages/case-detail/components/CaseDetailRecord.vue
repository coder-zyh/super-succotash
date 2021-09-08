<template>
	<div class="component case-detail-record">
		<div class="case-detail-record__content">
			<van-empty
				v-if="contacts.length == 0"
				description="暂无数据"
				image="network"
			/>
			<div
				v-for="(item, index) in contacts"
				:key="index"
				class="case-detail-record-item"
			>
				<div
					class="case-detail-record-item__content"
					@click="viewRecordClick(item)"
				>
					<div>
						<span>{{ item.operatorRealName }}</span>
						<span>({{ item.deptName }})</span>
						<span>{{ item.followTime }}</span>
					</div>
					<div>
						<span>[{{ item.relationship }}]{{ item.targetName }}</span>
						<span class="case-detail-record-item__content-style">
							[{{ item.addressType }}]
						</span>
					</div>
					<div>{{ item.addressDetail }}</div>
					<div class="case-detail-record-step">
						<div class="case-detail-record-step__circle"></div>
					</div>
					<div
						v-if="index + 1 != contacts.length"
						class="case-detail-record__line"
					></div>
				</div>
			</div>
			<div
				v-if="taskState"
				class="case-detail-record__content-btn"
				@click="addRecordClick"
			></div>
		</div>
	</div>
</template>
<script lang="ts">
//跟进记录
import { AppService } from "@/api/services/app.service";
import { RequestParams } from "@gopowerteam/http-request";
import { defineComponent, inject, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { FollowRecord } from "@/types/followRecord.interface";
import { useDict, useFilter } from "@/utils/hook.service";
export default defineComponent({
	name: "CaseDetailRecord",
	setup() {
		const route = useRoute();
		const router = useRouter();
		const taskState = ref(true);
		const caseId = inject("caseId") as string;
		// query list
		const queryRecord = () => {
			console.log("todo query");
		};
		const service = new AppService();
		const contacts = ref<FollowRecord[]>([]);
		const dataSource = ref([]);
		function getdictService() {
			const dictService = useDict();
			dataSource.value = dictService.getDictData("Relationship", "AddressType");
		}

		const filter = useFilter();

		onMounted(() => {
			taskState.value = route.query.taskState == "settle" ? false : true;
			getdictService();
			service.caseFollowupRecord(new RequestParams({ caseId })).subscribe({
				next: (value: any) => {
					value.forEach((element) => {
						Object.keys(element).forEach((key) => {
							dataSource.value.forEach((item) => {
								if (item.code == element[key]) {
									element[key] = item.name;
								}
							});
							if (key == "followTime") {
								element[key] = filter.dateTimeFormat(element[key]);
							}
						});
					});
					contacts.value = value;
				},
			});
		});
		return {
			taskState,
			contacts,
			// 添加跟进记录
			addRecordClick: () =>
				router.push({ name: "addRecord", params: { caseId } }),
			// 查看跟进记录
			viewRecordClick: (item) =>
				router.push({
					name: "viewRecord",
					query: { followupRecordId: item.followupRecordId },
				}),
		};
	},
});
</script>

<style lang="less" scoped>
.case-detail-record {
	background-color: #e2e2e2;
	min-height: 560px;
	width: 100%;
	padding-top: 1px;
	// &____content {
	// 	position: relative;
	// }
	&-item {
		position: relative;
		background-color: #fff;
		margin-top: 10px;
		border: 1px solid #efeded;
		box-shadow: 1px 1px 1px 1px rgba(52, 87, 129, 0.2);
		width: 85%;
		margin-left: 39px;
		&__content {
			margin-left: 10px;
			font-size: 14px;
			line-height: 30px;
			&-style {
				color: red;
			}
		}
		span {
			display: inline-block;
			margin-right: 10px;
		}
	}
	&-step {
		position: absolute;
		left: -30px;
		top: 0;
		&__circle {
			border-radius: 50%;
			width: 17px;
			height: 17px;
			background: #0062ad;
		}
	}
	&__line {
		position: absolute;
		left: -24px;
		top: 0;
		border-left: 3px solid #0062ad;
		height: 120%;
	}
	&__content-btn {
		position: fixed;
		right: 18px;
		bottom: 60px;
		width: 64px;
		height: 64px;
		background-image: url("../../../assets/imgs/btnbj.png");
		background-size: 100%;
		border-radius: 50%;
	}
}
</style>
