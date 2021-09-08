import { RequestService } from "@gopowerteam/http-request";
import { TokenService } from "./services/token.service";
import { Toast } from "vant";

const messageMap = new Map([
	[400, "请求参数错误"],
	[405, "请求服务方法错误"],
	[500, "服务器内部错误"],
	[403, "没有权限，请重新登陆"],
	[401, "登录过期，请重新登录"],
]);

export default function () {
	/**
	 * 错误通知标识
	 */
	let errorNotifyFlag = false;
	let timeOver = 0;

	// 判断dev 模式下是否开启mock
	let serviceUrl = import.meta.env.VITE_APP_SERVE;
	if (import.meta.env.DEV && import.meta.env.VITE_APP_MOCK === "true") {
		serviceUrl = "";
	}

	// 配置服务端信息
	RequestService.setConfig({
		server: serviceUrl,
		timeout: Number.parseInt(import.meta.env.VITE_APP_TIMEOUT),
	});

	// 添加状态拦截器
	RequestService.interceptors.status.use((response) => {
		return true;
	});

	// 添加成功拦截器
	RequestService.interceptors.success.use((respone) => {
		if (timeOver) {
			errorNotifyFlag = false;
			window.clearTimeout(timeOver);
			timeOver = 0;
		}
		return respone.data;
	});

	// 添加失败拦截器
	RequestService.interceptors.error.use((respone) => {
		return respone;
	});

	// 网络异常处理
	RequestService.requestCatchHandle = (respone) => {
		const defaultError = "服务通讯连接失败";
		if (respone) {
			const responseMessage = (respone.data || {}).message;
			const errorMessage =
				responseMessage || messageMap.get(respone.status) || defaultError;
			if (respone.status === 403) {
				console.error(respone.data);
			}

			Toast({
				type: "fail",
				message: errorMessage,
				// title: "请求处理失败",
			});

			if (respone.status === 401) {
				setTimeout(() => {
					window.location.href = "/";
				}, 500);
			}
		} else {
			if (!errorNotifyFlag) {
				Toast({
					type: "fail",
					message: defaultError,
				});
				errorNotifyFlag = true;
				timeOver = window.setTimeout(() => {
					errorNotifyFlag = false;
				}, 3000);
			}
		}
	};

	RequestService.installExtendService(new TokenService());
}
