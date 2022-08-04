import { store } from "@/store";
import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import router from ".";

/** 用户路由 */
const userTabbar: RouteRecordRaw[] = [
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
const adminTabbar: RouteRecordRaw[] = [
	{
		path: "report",
		name: "report",
		component: () => import("@/pages/main/report/Report.vue"),
		meta: {
			title: "报工",
		},
	},
	// {
	// 	path: "fee",
	// 	name: "fee",
	// 	component: () => import("@/pages/main/fee/Fee.vue"),
	// 	meta: {
	// 		title: "报销",
	// 	},
	// },
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

/** 添加首页路由 */
export function tabbarGuard(to: RouteLocationNormalized) {
	if (to.path.includes("/index/") && store.state.ready) {
		const routes = store.state.user.isAdmin ? adminTabbar : userTabbar;
		routes.forEach((route) => router.addRoute("index", route));
		return to.path;
	}
}
