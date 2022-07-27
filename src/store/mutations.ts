import { RootMutations, RootMutationType } from "@/types/mutation.type";

/**
 * rootState的更新动作
 */
export const rootMutations: RootMutations = {
	[RootMutationType.SET_READY](state, ready) {
		state.ready = ready;
	},
	[RootMutationType.SET_DICTDATA](state, dictData) {
		state.dict = dictData;
	},
	[RootMutationType.UPDATE_USER](state, user) {
		state.user = user;
	},
};
