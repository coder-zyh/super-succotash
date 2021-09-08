interface ImportMetaEnv {
	/**
	 * 系统名称
	 */
	VITE_APP_SYSNAME: string;
	/**
	 * 服务器地址
	 */
	VITE_APP_SERVE: string;
	/**
	 * 超时时间
	 */
	VITE_APP_TIMEOUT: string;
	/**
	 * 是否开启mock
	 */
	VITE_APP_MOCK: "true" | "false";
	/**
	 * 企业微信ID
	 */
	VITE_APP_CORPID: string;

	// 更多环境变量...
}
