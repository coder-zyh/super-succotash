import { RootMutations } from "@/types/mutation.type";

/**
 * rootState的更新动作
 */
export const rootMutations: RootMutations = {
	SET_READY(state, ready) {
		state.ready = ready;
	},
	SET_DICTDATA(state, dictData) {
		state.dict = dictData;
	},
};
