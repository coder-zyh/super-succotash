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
