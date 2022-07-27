import { Store } from "vuex";
import { RootState } from "../src/types/state.type";
import { Router } from "vue-router";

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$store: Store<RootState>;
		$router: Router;
	}
}
