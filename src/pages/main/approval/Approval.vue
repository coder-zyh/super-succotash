<template>
	<div class="page_content approval">
		<zw-nav-bar hidden-left title="审批"></zw-nav-bar>

		<van-tabs v-model:active="active" sticky offset-top="46">
			<van-tab title="待审批"></van-tab>
			<van-tab title="已审批">
				<approval-list-item
					v-for="item in approvalList"
					:key="item.code"
					:item="item"
				></approval-list-item>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script lang="ts" setup>
import { AppService } from "@/api/services/app.service";
import { ApprovalItem } from "@/types/approval.interface";
import ApprovalListItem from "./components/ApprovalListItem.vue";
import { ref } from "vue";
const active = ref(0);
const approvalList = ref<ApprovalItem[]>([]);
const unApprovalList = ref<ApprovalItem[]>([]);
approvalList.value.push(
	{
		userName: "陈鹏杰123",
		projectName: "公司演示及生产服务器维护",
		code: "397",
		day: 8,
		amount: null,
		fromDate: 1654012800000,
	},
	{
		userName: "陈鹏杰123",
		projectName: "公司演示及生产服务器维护",
		code: "397",
		day: 4,
		amount: null,
		fromDate: 1654099200000,
	},
	{
		userName: "陈鹏杰123",
		projectName: "公司演示及生产服务器维护",
		code: "397",
		day: 8,
		amount: null,
		fromDate: 1654444800000,
	},
	{
		userName: "陈鹏杰123",
		projectName: "公司演示及生产服务器维护",
		code: "397",
		day: 8,
		amount: null,
		fromDate: 1654531200000,
	},
	{
		userName: "陈鹏杰123",
		projectName: "公司演示及生产服务器维护",
		code: "397",
		day: 8,
		amount: null,
		fromDate: 1654617600000,
	},
	{
		userName: "陈鹏杰123",
		projectName: "公司演示及生产服务器维护",
		code: "397",
		day: 8,
		amount: null,
		fromDate: 1654704000000,
	},
	{
		userName: "陈鹏杰123",
		projectName: "公司演示及生产服务器维护",
		code: "397",
		day: 4,
		amount: null,
		fromDate: 1654790400000,
	},
	{
		userName: "陈鹏杰123",
		projectName: "公司演示及生产服务器维护",
		code: "397",
		day: 4,
		amount: null,
		fromDate: 1655049600000,
	},
	{
		userName: "陈鹏杰123",
		projectName: "公司演示及生产服务器维护",
		code: "397",
		day: 8,
		amount: null,
		fromDate: 1655308800000,
	},
	{
		userName: "陈鹏杰123",
		projectName: "公司演示及生产服务器维护",
		code: "397",
		day: 4,
		amount: null,
		fromDate: 1655395200000,
	}
);
// new AppService().getApprovalList().subscribe({
// 	next: (data) => {
// 		console.log(data);
// 		// approvalList.value = data.map((x) => ({
// 		// 	text: x.name,
// 		// 	value: x.id,
// 		// }));
// 	},
// });
</script>
