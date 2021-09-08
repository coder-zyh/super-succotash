import { ExtendService, RequestParams } from "@gopowerteam/http-request";
import { ref } from "vue";

export class PageService extends ExtendService {
	public default = {
		pageSize: 20,
		pageIndex: 1,
		total: 1,
		pageSizeOpts: [20, 50, 100, 200],
	};
	public pageSize = ref(0);
	public pageIndex = ref(1);
	public total = ref(0);
	public pageSizeOpts: number[];

	constructor(data?: any) {
		super();

		if (data) this.default = { ...this.default, ...data };

		this.pageSize.value = this.default.pageSize;
		this.pageIndex.value = this.default.pageIndex;
		this.total.value = this.default.total;
		this.pageSizeOpts = this.default.pageSizeOpts;
	}

	public before = (params: RequestParams) => {
		const data = params.getData();
		params.setData({
			...data,
			pageSize: this.pageSize.value,
			pageNo: this.pageIndex.value,
		});
	};

	public after = (data: any) => {
		this.total.value = data.total;
		data.content = data.records || [];
	};

	public reset() {
		this.pageIndex.value = this.default.pageIndex;
		this.pageSize.value = this.default.pageSize;
	}
}
