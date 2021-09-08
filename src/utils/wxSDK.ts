import { WxService } from "@/api/services/wx.service";
import { RequestParams } from "@gopowerteam/http-request";
import { Observable, Subscriber, from, iif, throwError } from "rxjs";
import { concatMap, filter, switchMap, concatWith } from "rxjs/operators";
declare let wx: any;

/**
 * 要使用的接口列表
 */
const jsApiList = [
	"getLocalImgData",
	"chooseImage",
	"uploadImage",
	"openLocation",
	"getLocation",
	"startRecord",
	"stopRecord",
	"onVoiceRecordEnd",
	"uploadVoice",
	"playVoice",
	"stopVoice",
	"onVoicePlayEnd",
];

/**
 * 成功正则表达式
 */
const okRegx = /ok$/;

/**
 * 微信JSSDK服务
 */
export class WxSDKService {
	/**
	 * 当前SDK 是否可用
	 */
	private ready: Promise<boolean> | null = null;
	private readonly SDK_ERROR = "SDK 暂不能使用";

	/**
	 * 使用jsSDK
	 * 如果url变化之后，需要重新调用，同一个页面只需要调用一次
	 * @param timestamp
	 * @param nonceStr
	 * @param signature
	 * @returns
	 */
	private useJssdk() {
		const param = new RequestParams({
			url: window.location.href,
		});
		new WxService().getSignInfo(param).subscribe({
			next: ({ timestamp, nonceStr, signature, appId }) => {
				wx.config({
					beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId, // 必填，企业微信的corpID
					timestamp, // 必填，生成签名的时间戳
					nonceStr, // 必填，生成签名的随机串
					signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
					jsApiList, // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
				});
			},
		});

		return new Promise<boolean>((resolve, reject) => {
			// ready jssdk可以使用
			wx.ready(() => resolve(true));
			wx.error((res: any) => {
				reject(false);
				console.error(res.errMsg, "onError");
				throw res.errMsg;
			});
		});
	}

	private onReady() {
		if (!this.ready) {
			this.ready = this.useJssdk();
		}
		return this.ready;
	}

	private onCatch(subscriber: Subscriber<any>) {
		return subscriber.error(this.SDK_ERROR);
	}

	/**
	 * 选择图片，并且上传
	 * @param count 图片的数量,默认9张
	 * @returns
	 * @example
	 *	const service = new WxSDKService();
	 *	service.chooseImages(3).subscribe({
	 *		next: (ImageData) => {
	 *			// ImageData1
	 *      // ImageData2
	 *      // ...
	 *		},
	 *	});
	https://xib02.test.xib.com.cn:3000/overdue
	获取签名成功:,AppWechatEntity(jsapi_ticket=KnBSSw0vnrKz1ZPmQVbuRqesvXIBNjIt1XvXX3uEyFw, expire_time=null, appId=wwce8c1c09b5476e91, nonceStr=b0d4e8d908b24443af1bba15c487bbbc, timestamp=1625043023, signature=7487e3b3c0720db11f08b931e139afdbbc6cf86b, access_token=QLxciSgyxpt9sP4cnHMWS1HG8Ax5To_wrbLStUomN7cATNknWFy1CGuVFtl5zeTHfTZvM_y00Pil9YMKhLV2uw-yD93zS2AGLbJr4kcewmyNMbbrDESYqio4bLfSm0MAKXb7UV10Oyp2eNUp01VDAEgSI4wpwT7EPVJqz9lep6L91KZlU47bim4wqVpBC7tCFjfQlOAu3Bif9iy8mkhqOknQskdoycPl45ZoQ9Cz_N0)
	 */
	public chooseImages(count = 9) {
		// 选图片
		const chooseImage$ = new Observable<string[]>((subscriber) => {
			wx.chooseImage({
				count,
				// sizeType: ["original"],
				sizeType: ["compressed"],
				success: ({ errMsg, localIds }) => {
					errMsg && okRegx.test(errMsg)
						? subscriber.next(localIds)
						: subscriber.error(errMsg);
					//
					subscriber.complete();
				},
			});
		});

		// 获取图片数据
		const getImageData = (localId) =>
			new Observable<ImageData>((subscriber) => {
				wx.getLocalImgData({
					localId,
					success: ({ errMsg, localData }) => {
						errMsg && okRegx.test(errMsg)
							? subscriber.next({
								localId,
								data: localData,
							})
							: subscriber.error(errMsg);

						subscriber.complete();
					},
				});
			});

		return from(this.onReady()).pipe(
			filter((v) => !!v),
			switchMap(() => chooseImage$),
			switchMap(from),
			concatMap(getImageData)
		);
	}

	/**
	 * 上传图片
	 * @param localId
	 * @returns
	 */
	public uploadImage(localId: string) {
		return new Observable<UploadInfo>((subscriber) => {
			wx.uploadImage({
				localId,
				isShowProgressTips: 0,
				success: ({ errMsg, serverId }) => {
					errMsg && okRegx.test(errMsg)
						? subscriber.next({
							localId,
							serverId,
						})
						: subscriber.error(errMsg);
					subscriber.complete();
				},
			});
		});
	}

	/**
	 * 打开一个位置
	 * @param location 位置信息
	 * @returns
	 * @example
	 * 		// 服务端可用解析方式获取地址对应的坐标信息
	 * 		// https://lbs.qq.com/service/webService/webServiceGuide/webServiceGeocoder
	 *  	sdkService.openLocation(
	 *			{
	 *					latitude: 39.982915, // 纬度，浮点数，范围为90 ~ -90
	 *					longitude: 116.307015, // 经度，浮点数，范围为180 ~ -180。
	 *					name: "海淀西大街74号", // 位置名
	 *					address: "海淀西大街74号", // 地址详情说明
	 *					scale: 9, // 地图缩放级别,整形值,范围从1~28。默认为16
	 *			}
	 * 		).subscribe({
	 * 	 		next:() =>{ console.log('操作成功') }
	 * 		})
	 */
	public openLocation(location: getLocationLocationInfo) {
		const _openLocation = new Observable<void>((subscriber) => {
			wx.openLocation({
				...location,
				success: ({ errMsg }) => {
					if (okRegx.test(errMsg)) {
						subscriber.complete();
					} else {
						subscriber.error(errMsg);
					}
				},
			});
		});

		return from(this.onReady()).pipe(
			filter((v) => !!v),
			switchMap(() => _openLocation)
		);
	}

	/**
	 * 获取位置
	 * @param location 位置信息
	 * @example
	 *  	sdkService.getLocation()
	 * 		.subscribe({
	 * 	 		next:(data:Location) =>{
	 *				// 服务端可用反解析方式获取省市区信息
	 *				// https://lbs.qq.com/service/webService/webServiceGuide/webServiceGcoder
	 * 			}
	 * 		})
	 * @returns Location
	 */
	public getLocation() {
		const _getLocation = new Observable<Location>((subscriber) => {
			wx.getLocation({
				type: "gcj02",
				success: ({ errMsg, longitude, latitude }) => {
					if (okRegx.test(errMsg)) {
						subscriber.next({
							longitude,
							latitude,
						});
						subscriber.complete();
					} else {
						subscriber.error(errMsg);
					}
				},
			});
		});

		return from(this.onReady()).pipe(
			filter((v) => !!v),
			switchMap(() => _getLocation)
		);
	}

	//#region 录音

	// 录音对象，在整个录音过程存在，手动停止后结束
	private recorder: Subscriber<string> | null = null;
	/**
	 * 开始持续录音, 每一分钟会next一个值，需要自己存储,直到超过设定时间 120分钟
	 * @returns
	 * @example
	 * const recordIds = [];
	 * const service = new WxSDKService();
	 * service.startRecordes(30).subscribe({
	 *	next: (id) => {
	 *		recordIds.push(id);
	 *		// upload this record
	 *	},
	 *	complete: () => {
	 *		// 录音最大限制次数已到
	 *	},
	 * });
	 */
	public startRecord() {
		this.recorder = null;
		let count = 0;
		const createObverable$ = new Observable<string | boolean>((subscriber) => {
			this.recorder = subscriber;
			const start = () => {
				return new Promise((resolve, reject) => {
					count++;
					setTimeout(() => {
						wx.startRecord({
							fail: ({ errMsg }) => {
								reject(errMsg)
							},
						});
					}, 1)
					resolve(
						setTimeout(() => {
							wx.stopRecord({
								complete: ({ errMsg, localId }) => {
									if (okRegx.test(errMsg)) {
										subscriber.next(localId);
										if (count < 120 && this.recorder) {
											start();
										}
									} else {
										subscriber.error(errMsg);
										subscriber.complete();
									}
								},
							});
						}, 55000)
					)
				});
			};
			start();
		});

		return iif(
			() => !!this.recorder,
			throwError(() => new Error("正在录音中")),
			from(this.onReady())
		).pipe(
			filter((v) => !!v),
			concatWith(createObverable$)
		);
	}

	/**
	 * 录音停止
	 * @returns Observable<void>
	 * @example
	 * const service = new WxSDKService();
	 * service.stopRecord().subscribe({
	 * 		error: (msg) => {
	 * 			// notify error msg
	 * 		},
	 *    complete:() =>{
	 *      // do sometings
	 *    }
	 * });
	 */
	public stopRecord() {
		const stop$ = new Observable<void>((subscriber) => {
			wx.stopRecord({
				success: ({ errMsg, localId }) => {
					if (!this.recorder) {
						subscriber.error("录音控制器错误");
						return;
					}
					if (okRegx.test(errMsg)) {
						// 录音数据发送给start 时间的消息源
						this.recorder.next(localId);
						// 告诉本次操作正常结束
						subscriber.complete();
					} else {
						subscriber.error(errMsg);
					}
					// 不管是否正常结束，录音对象都要置空
					this.recorder.complete();
					this.recorder = null;
				},
			});
		});

		return iif(
			() => !!this.recorder,
			from(this.onReady()),
			throwError(() => new Error("还未开始录音"))
		).pipe(
			filter((v) => !!v), // 总之必须ready之后才可以执行wx的api
			switchMap(() => stop$)
		);
	}

	/**
	 * 上传录音文件
	 * @param localId 录音文件ID，通过startRecordes 订阅获取
	 * @returns Observable
	 * @example
	 * const service = new WxSDKService();
	 * // id通过startRecordes的订阅获取
	 *	const id = "0001";
	 *	const recordList = [
	 *		{
	 *			localId: "0001",
	 *			serverId: "",
	 *			uploaded: false,
	 *		},
	 *	];
	 *
	 *	service.uploadRecord(id).subscribe({
	 *		next: ({ localId, serverId }) => {
	 *			const item = recordList.find((x) => x.localId === localId);
	 *			if (!item) return;
	 *			item.serverId = serverId;
	 *			item.uploaded = true;
	 *			// need computed item uploaded status to render successful status
	 *		},
	 *		error: (msg) => {
	 *			// notify error msg
	 *		},
	 *	});
	 */
	public uploadRecord(localId: string) {
		const upload$ = new Observable<UploadInfo>((subscriber) => {
			wx.uploadVoice({
				localId, // 需要上传的音频的本地ID，由stopRecord接口获得
				isShowProgressTips: 0, // 不显示上传进度，没用
				success: ({ errMsg, serverId }) => {
					if (okRegx.test(errMsg)) {
						subscriber.next({
							localId,
							serverId: serverId,
						});
					} else {
						subscriber.error(errMsg);
					}
				},
				fail: ({ errMsg, serverId }) => {
					subscriber.error(errMsg);
					subscriber.complete();
				},
			});
		});

		return from(this.onReady()).pipe(
			filter((v) => !!v),
			switchMap(() => upload$)
		);
	}

	/**
	 * 播放录音
	 * 如果需要连续播放，可以在complete回调里面调用一次播放
	 * @param recordId
	 * @returns
	 */
	public playRecord(recordId: string) {
		const play$ = new Observable<string>((subscriber) => {
			console.log("%c 准备播放", "color:green;");

			// 播放操作
			wx.playVoice({
				localId: recordId, // 需要播放的音频的本地ID，由stopRecord接口获得
				fail: ({ errMsg }) => {
					console.log("%c 播放错误", "color:red;");
					subscriber.error(errMsg);
				},
			});

			/**
			 * BUG 处理
			 * 因为在安卓手机 打开企业微信应用 wx.playVoice 第一次不触发success回调。
			 * 所以这里默认播放成功，只有失败的时候处理errMsg
			 * Duang 2021-07-07
			 */
			subscriber.next(recordId);

			// 处理自动结束
			wx.onVoicePlayEnd({
				success: ({ errMsg, localId }) => {
					console.log("%c 播放结束", "color:green;");
					if (okRegx.test(errMsg)) {
						// 告诉外部，播放完毕了，可以下一次了
						localId === recordId
							? subscriber.complete()
							: subscriber.error("stoped:" + localId);
					} else {
						subscriber.error(errMsg);
					}
				},
			});
		});

		return from(this.onReady()).pipe(
			filter((v) => !!v),
			switchMap(() => play$)
		);
	}

	/**
	 * 停止播放
	 * 停止播放成功，会返回停止的录音ID
	 * @param recoredId
	 * @returns
	 */
	public playStop(recoredId: string) {
		const stop$ = new Observable<void>((subscriber) => {
			wx.stopVoice({
				localId: recoredId, // 需要停止的音频的本地ID，由stopRecord接口获得
				success: ({ errMsg, localId }) => {
					if (okRegx.test(errMsg)) {
						subscriber.next(localId);
					} else {
						subscriber.error(errMsg);
					}
					subscriber.complete();
				},
			});
		});

		return from(this.onReady()).pipe(
			filter((v) => !!v),
			switchMap(() => stop$)
		);
	}

	//#endregion

	//#region demo
	private demoFun() {
		const service = new WxSDKService();
		// id通过startRecordes的订阅获取
		const id = "0001";
		const recordList = [
			{
				localId: "0001",
				serverId: "",
				uploaded: false,
			},
		];

		service.uploadRecord(id).subscribe({
			next: ({ localId, serverId }) => {
				const item = recordList.find((x) => x.localId === localId);
				if (!item) return;
				item.serverId = serverId;
				item.uploaded = true;
				// need computed item uploaded status to render successful status
			},
			error: (msg) => {
				// notify error msg
			},
		});
	}
	//#endregion
}

/**
 * 位置数据
 */
export interface Location {
	/**
	 * 纬度，浮点数，范围为90 ~ -90
	 */
	latitude: number;
	/**
	 * 经度，浮点数，范围为180 ~ -180。
	 */
	longitude: number;
}

/**
 * 位置信息
 */
export interface getLocationLocationInfo extends Location {
	/**
	 * 位置名
	 */
	name?: string;
	/**
	 * 地址详情说明
	 */
	address?: string;
	/**
	 * 地图缩放级别,整形值,范围从1~28。默认为16
	 */
	scale?: number;
}

/**
 * 图片信息
 */
export interface ImageInfo {
	/**
	 * 图片ID，删除时区分
	 */
	name: string;

	/**
	 * 图片上传状态
	 */
	status: UploadStatus;
	/**
	 * uploadItem 的content属性，用来先显示图像
	 */
	content: string;
	/**
	 * 提示文字
	 */
	message: string;

	/**
	 * 服务器ID
	 */
	serverId: string;
}

/**
 * 图片上传状态
 */
export type UploadStatus = "uploading" | "failed" | "done";

export interface ImageData {
	/**
	 * 文件ID
	 */
	localId: string;
	/**
	 * base64 数据
	 */
	data: string;
}

export interface UploadInfo {
	localId: string;

	/**
	 * 在微信服务器的mediaId
	 */
	serverId: string;
}

export interface RecordInfo extends UploadInfo {
	status: UploadStatus;
}
