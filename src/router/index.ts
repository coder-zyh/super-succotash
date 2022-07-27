import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { userTabbar, adminTabbar } from "./tabbar.routes";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		component: () => import("@/pages/Login.vue"),
		name: "login",
	},
	{
		path: "/index",
		component: () => import("@/pages/index/Index.vue"),
		name: "index",
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

export function useRouter() {
	return router;
}

/** 添加首页路由 */
export function addTabbarRoutes(isAdmin: boolean) {
	const routes = isAdmin ? adminTabbar : userTabbar;
	routes.forEach((route) => router.addRoute("index", route));
}
