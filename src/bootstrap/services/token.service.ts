import { ExtendService, RequestParams } from "@gopowerteam/http-request";
import { AxiosResponse } from "axios";

export const tokenKey = "X-UserToken";

export class TokenService extends ExtendService {
	public before = (params: RequestParams) => {
		const token = window.sessionStorage.getItem("token");
		// const token = "51bcc0a0-6cd5-4ca3-a4b1-24792d7d7f62";
		const options = params.getOptions();
		const header = options.header || {};
		if (token) {
			header[tokenKey] = token;
		} else {
			delete header[tokenKey];
		}
		params.setOptions({
			...options,
			header,
		});
	};

	public after = (response: AxiosResponse, _requestParams: any) => {
		if (response.status === 401) {
			window.localStorage.removeItem("token");
			window.location.href = "/";
		}
	};
}
