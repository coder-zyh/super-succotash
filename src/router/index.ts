import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		component: () => import("@/pages/index/Index.vue"),
		redirect: "/home",
		children: [
			{
				path: "home",
				name: "home",
				component: () => import("@/pages/main/home/Home.vue"),
				meta: {
					title: "首页",
				},
			},
			{
				path: "overdue",
				name: "overdue",
				component: () => import("@/pages/main/task-overdue/TaskOverdue.vue"),
				meta: {
					title: "逾期任务",
				},
			},
			{
				path: "risk",
				name: "risk",
				component: () => import("@/pages/main/task-risk/TaskRisk.vue"),
				meta: {
					title: "风险任务",
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
		path: "/search/:type(risk|overdue)", // 仅匹配这两个类型
		name: "search",
		component: () => import("@/pages/search/Search.vue"),
		props: true,
		meta: {
			title: "搜索",
		},
	},
	{
		path: "/case-detail/:caseId",
		name: "detail",
		component: () => import("@/pages/case-detail/CaseDetail.vue"),
		props: true,
		meta: {
			title: "案件详情",
		},
	},
	{
		path: "/customer-repair/:caseId",
		name: "repair",
		component: () => import("@/pages/customer-repair/CustomerRepair.vue"),
		props: true,
		meta: {
			title: "新增信息",
		},
	},
	{
		path: "/add-record/:caseId",
		name: "addRecord",
		component: () =>
			import("@/pages/follow-record/follow-record-add/FollowRecordAdd.vue"),
		props: true,
		meta: {
			title: "新增跟进记录",
		},
	},
	{
		path: "/view-record/:caseId",
		name: "viewRecord",
		component: () =>
			import("@/pages/follow-record/follow-record-view/FollowRecordView.vue"),
		props: true,
		meta: {
			title: "查看跟进记录",
		},
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
