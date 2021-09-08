import qs from "qs";
import { store } from "@/store";
import { RootMutationType } from "@/types/mutation.type";
import { AppService } from "@/api/services/app.service";
import { RequestParams } from "@gopowerteam/http-request";
import { Toast } from "vant";
import { WxService } from "@/api/services/wx.service";
const authState = "XMGJYH-DHCSH5";

export default function () {
	store.commit(RootMutationType.SET_READY, false);
	const { code, state } = qs.parse(window.location.search, {
		ignoreQueryPrefix: true,
	});

	if (!!sessionStorage.getItem("token")) {
		store.commit(RootMutationType.SET_READY, true);
		return;
	}

	// if (code) {
	if (code && state === authState) {
		new WxService().appLogin(new RequestParams({ code })).subscribe({
			next: (value: any) => {
				sessionStorage.setItem("token", value.token);
				sessionStorage.setItem("realName", value.realName);
				store.commit(RootMutationType.SET_READY, true);
			},
			error: (err) => {
				Toast(err.message);
				// window.close();
			},
		});
	} else {
		Toast("非法登录");
		window.close();
	}
}
/**
 * 跳转授权
 */
function goToAuth() {
	const oauth2Url = "https://open.weixin.qq.com/connect/oauth2/authorize";
	const param = {
		/**企业的CorpID */
		appid: import.meta.env.VITE_APP_CORPID,
		/**授权后重定向的回调链接地址 */
		redirect_uri: window.location.host,
		response_type: "code",
		scope: "snsapi_base",
		state: authState,
	};
	const href = `${oauth2Url}?${qs.stringify(param)}#wechat_redirect`;
	window.location.replace(href);
}
