import { RootState } from "@/types/state.type";

// root state
export const rootState: RootState = {
	ready: false,
	dict: {},
	user: {
		username: "",
		phone: "",
		email: "",
		realName: "",
		gender: "男",
		isAdmin: false,
	},
};
