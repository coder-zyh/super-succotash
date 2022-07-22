import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		component: () => import("@/pages/index/Index.vue"),
		redirect: "/report",
		children: [
			{
				path: "report",
				name: "report",
				component: () => import("@/pages/main/report/Report.vue"),
				meta: {
					title: "报工",
					KeepAlive: true,
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
		],
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("@/pages/NotFound.vue"),
	},
];
const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
