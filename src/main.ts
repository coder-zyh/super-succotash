import { createApp, h } from "vue";
import router from "./router";
import { boot } from "./bootstrap";
import { store, key } from "./store";
import "@/assets/styles/index.less";
import { RouterView } from "vue-router";

// 创建Vue实例
const app = createApp(h(RouterView));

boot(app);

// 使用vuex v4
app.use(store, key);
// 使用vue router v4
app.use(router);
// 挂载根组件到app节点
app.mount("#app");
