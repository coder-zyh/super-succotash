import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { tabbarGuard } from "./tabbar.routes";

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

const dynamicRouteSetting = {
	tabberBar: false,
};

export default router;

router.beforeEach((to) => {
	// tabbar 守卫
	if (!dynamicRouteSetting.tabberBar) {
		const path = tabbarGuard(to);
		dynamicRouteSetting.tabberBar = !!path;
		return path;
	}
});

export function useRouter() {
	return router;
}
