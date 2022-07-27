import { IRequestServerConfig } from "@gopowerteam/http-request";
import axios from "axios";
import { Observable, Observer } from "rxjs";

export default class NetService {
	static readonly axiosInstance = axios.create({
		withCredentials: true,
		timeout: 3000,
		baseURL: import.meta.env.VITE_APP_SERVE,
	});

	/**
	 * HTTP请求处理

	 * @param server 已配置的网络请求路径
	 * @param data 附加请求参数
	 * @returns 可观察对象
   * @example
	 * reuest<UserInfo[]>(AppControll.getUsers,{pageIndex:1,pageSize:20})
   * .subscribe({
   *  next:(data) =>{
   *    list.value = data  
   *  },
   *  error:(err) => console.log(err)
   * })
	 */
	static request<T>(server: IRequestServerConfig, data?: any) {
		const url =
			server.path ??
			[server.service, server.controller, server.action]
				.join("/")
				.replace(/\/\//, "/");

		let observer: Observer<T>;
		const observable = new Observable<T>((obs) => (observer = obs));

		this.axiosInstance
			.request({
				url,
				method: server.type.toString(),
				data,
			})
			.then((res) => {
				if (res.status === 200) {
					observer.next(res.data);
				} else {
					observer.error("服务响应失败，请稍后重试");
				}
			})
			.catch(() => {
				observer.error("服务请求失败，请检查网络");
			});

		return observable;
	}
}
