<template>
	<div class="page case-detail">
		<ZwNavBar />
		<div class="page_content">
			<van-tabs
				v-model:active="currentTabName"
				line-width="80"
				title-active-color="#0062ad"
				title-inactive-color="#aaaaaa"
			>
				<van-tab name="customer" title="基本信息">
					<CaseDetailCustomer />
				</van-tab>
				<van-tab name="info" title="案件信息">
					<CaseDetailInfo />
				</van-tab>
				<van-tab name="record" title="跟进记录">
					<CaseDetailRecord />
				</van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from "@vue/runtime-core";
import CaseDetailCustomer from "./components/CaseDetailCustomer.vue";
import CaseDetailInfo from "./components/CaseDetailInfo.vue";
import CaseDetailRecord from "./components/CaseDetailRecord.vue";
import { StringMust } from "@/utils/usePropType";
import { useRoute } from "vue-router";
export default defineComponent({
	name: "CaseDetail",
	components: { CaseDetailCustomer, CaseDetailInfo, CaseDetailRecord },
	props: {
		caseId: StringMust,
	},
	setup(props) {
		const route = useRoute();
		const currentTabName = route.query.currentTab;
		// 提供caseId
		provide("caseId", props.caseId);
		return {
			currentTabName,
		};
	},
});
</script>
<style lang="less" scoped>
:deep(.van-tabs__line) {
	background-color: #0062ad;
}
</style>
