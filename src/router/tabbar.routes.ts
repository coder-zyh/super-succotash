import { RouteRecordRaw } from "vue-router";

/** 用户路由 */
export const userTabbar: RouteRecordRaw[] = [
	{
		path: "report",
		name: "report",
		component: () => import("@/pages/main/report/Report.vue"),
		meta: {
			title: "报工",
		},
	},
	{
		path: "my",
		name: "my",
		component: () => import("@/pages/main/my/My.vue"),
		meta: {
			title: "我的",
		},
	},
];

/** 管理员路由 */
export const adminTabbar: RouteRecordRaw[] = [
	{
		path: "report",
		name: "report",
		component: () => import("@/pages/main/report/Report.vue"),
		meta: {
			title: "报工",
		},
	},
	{
		path: "fee",
		name: "fee",
		component: () => import("@/pages/main/fee/Fee.vue"),
		meta: {
			title: "报销",
		},
	},
	{
		path: "fill",
		name: "fill",
		component: () => import("@/pages/main/fee/FeeFill.vue"),
		meta: {
			title: "报销",
		},
	},
	{
		path: "approval",
		name: "approval",
		component: () => import("@/pages/main/approval/Approval.vue"),
		meta: {
			title: "审批",
		},
	},
	{
		path: "project",
		name: "project",
		component: () => import("@/pages/main/project/Project.vue"),
		meta: {
			title: "项目",
		},
	},
	{
		path: "my",
		name: "my",
		component: () => import("@/pages/main/my/My.vue"),
		meta: {
			title: "我的",
		},
	},
];
