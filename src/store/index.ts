import { RootState } from "@/types/state.type";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { rootMutations } from "./mutations";
import { rootState } from "./state";
import createPersistedState from "vuex-persistedstate";

export const key: InjectionKey<Store<RootState>> = Symbol();

/**
 * store instance
 */
export const store = createStore({
	strict: true,
	state: rootState,
	mutations: rootMutations,
	plugins: [createPersistedState()],
});

/**
 * 使用store
 * @returns store instance
 */
export function useStore() {
	return baseUseStore(key);
}
