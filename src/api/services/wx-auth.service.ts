import { Request, RequestParams } from "@gopowerteam/http-request";
import { Observable } from "rxjs";
import { WxAuthController } from "../controllers/wx-auth.controller";

/**
 * 微信相关的服务，后端认证等
 */
export class WxAuthService {
	/**
	 * 获取用户信息
	 * 微信授权后通过code获取用户信息
	 */
	@Request({
		server: WxAuthController.getUserInfo,
	})
	public getUserInfo(requestParams: RequestParams): Observable<any> {
		return requestParams.request();
	}
}
