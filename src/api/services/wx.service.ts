import { Request, RequestParams } from "@gopowerteam/http-request";
import { Observable } from "rxjs";
import { WxAuthController } from "../controllers/wx.controller";

/**
 * 微信相关的服务，后端认证等
 */
export class WxService {
	/**
	 * 获取签名，用于jssdk config
	 */
	@Request({
		server: WxAuthController.getSignInfo,
	})
	public getSignInfo(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}

	/**
	 * 获取用户信息
	 * 微信授权后通过code获取用户信息
	 */
	@Request({
		server: WxAuthController.appLogin,
	})
	public appLogin(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 地址解析
	 */
	@Request({
		server: WxAuthController.getAddressToLatitude,
	})
	public getAddressToLatitude(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
	/**
	 * 逆地址解析
	 */
	@Request({
		server: WxAuthController.getLatAndLngToAddress,
	})
	public getLatAndLngToAddress(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
}
