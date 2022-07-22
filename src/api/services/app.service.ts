import axios from "axios";
import { Observable } from "rxjs";
import { AppController } from "../controllers/app.controller";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_APP_SERVE;

export class AppService {
	/**
	 * 用户登录
	 * @param uname
	 * @param pwd
	 * @returns
	 */
	public login<T = any>(uname: string, pwd: string) {
		const config = AppController.login;
		const form = new FormData();
		form.append("username", uname);
		form.append("password", pwd);

		return new Observable((observer) => {
			axios
				.post<HttpResonseType<T>>(config.path, form, { withCredentials: true })
				.then((res) => {
					if (res.status !== 200) {
						return observer.error(res.statusText);
					}
					console.log(res.headers);
					if (res.data.success) {
						observer.next(res.data.obj);
					} else {
						observer.error(res.data.msg);
					}
				})
				.catch(() => {
					observer.error("登录失败，请稍后重试");
				});
		});
	}

	/** 获取项目列表 */
	public getProjectList() {
		const config = AppController.getProjectList;
		return new Observable((observer) => {
			axios
				.get(config.path)
				.then((res) => {
					if (res.status !== 200) {
						return observer.error(res.statusText);
					}
					observer.next(res.data);
				})
				.catch(() => {
					observer.error("登录失败，请稍后重试");
				});
		});
	}
}
