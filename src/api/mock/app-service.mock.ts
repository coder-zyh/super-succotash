import { MockMethod } from "vite-plugin-mock";
import mockjs from "mockjs";
import { AppController } from "../controllers/app.controller";
import {
	IRequestServerConfig,
	RequestOption,
	RequestParams,
} from "@gopowerteam/http-request";

export default [
	{
		url: getUrl(AppController.getWaitCaseAmount),
		response: () => {
			return mockjs.Random.integer(50000, 10000000);
		},
	},
	{
		url: getUrl(AppController.getRiskCaseTotal),
		method: AppController.getRiskCaseTotal.type.valueOf(),
		response: () => {
			return mockjs.Random.integer(300, 4000);
		},
	},
	{
		url: getUrl(AppController.getOverdueCaseTotal),
		method: AppController.getOverdueCaseTotal.type.valueOf(),
		response: () => {
			return mockjs.Random.integer(300, 4000);
		},
	},
	{
		url: getUrl(AppController.getAllCaseTotal),
		method: AppController.getAllCaseTotal.type.valueOf(),
		response: () => {
			return mockjs.Random.integer(300, 4000);
		},
	},
	{
		url: getUrl(AppController.getNewlyCaseCount),
		method: AppController.getNewlyCaseCount.type.valueOf(),
		response: () => {
			return mockjs.Random.integer(300, 4000);
		},
	},
	{
		url: getUrl(AppController.getNewFollowupCaseCount),
		method: AppController.getNewFollowupCaseCount.type.valueOf(),
		response: () => {
			return mockjs.Random.integer(300, 4000);
		},
	},
	{
		url: getUrl(AppController.getNewWaitFollowupCount),
		method: AppController.getNewWaitFollowupCount.type.valueOf(),
		response: () => {
			return mockjs.Random.integer(300, 4000);
		},
	},
	{
		url: getUrl(AppController.getPersonalInfo),
		method: AppController.getPersonalInfo.type.valueOf(),
		response: ({ query }) => {
			const { type } = query;
			const mockData = mockjs.mock({
				"records|1": [
					{
						id: mockjs.Random.natural().toString(),
						name: "@cname",
						type,
						personalName: "@cname",
						sex: "@cname",
						age: "@cname",
						marital: "@cname",
						education: "@cname",
						mobileNo: mockjs.Random.natural().toString(),
						idcard: mockjs.Random.natural().toString(),
						detail: "@cname",
					},
				],
			});
			return mockData.records;
		},
	},
	{
		url: getUrl(AppController.getPersonalContacts),
		method: AppController.getPersonalContacts.type.valueOf(),
		response: ({ query }) => {
			const { type } = query;
			const mockData = mockjs.mock({
				"records|1-10": [
					{
						id: mockjs.Random.natural().toString(),
						relation: "@cname",
						type,
						contName: "@cname",
						phone: "@cname",
						phoneStatus: "@cname",
					},
				],
			});
			return mockData.records;
		},
	},
	{
		url: getUrl(AppController.queryCaseInfo),
		method: AppController.queryCaseInfo.type.valueOf(),
		response: ({ query }) => {
			const { type } = query;
			const mockData = mockjs.mock({
				"records|1": [
					{
						id: mockjs.Random.natural().toString(),
						type,
						personalNo: mockjs.Random.natural().toString(),
						caseNumber: mockjs.Random.natural().toString(),
						levelFiveClass: mockjs.Random.natural().toString(),
						prodBclass: mockjs.Random.natural().toString(),
						loanAmount: mockjs.Random.natural().toString(),
						loanBal: mockjs.Random.natural().toString(),
						perDueDate: mockjs.Random.natural().toString(),
						perPayAmount: mockjs.Random.natural().toString(),
						actualOvdueAmt: mockjs.Random.natural().toString(),
						oweIntBalCny: mockjs.Random.natural().toString(),
						hangIntBalCny: mockjs.Random.natural().toString(),
						overdueAmount: mockjs.Random.natural().toString(),
						hasPayAmount: mockjs.Random.natural().toString(),
						overdueDate: mockjs.Random.natural().toString(),
						overdueDays: mockjs.Random.natural().toString(),
						overduePeriod: mockjs.Random.natural().toString(),
						hasPayPeriods: mockjs.Random.natural().toString(),
						latelyPayDate: mockjs.Random.natural().toString(),
						latelyPayAmount: mockjs.Random.natural().toString(),
					},
				],
			});
			return mockData.records;
		},
	},
	{
		url: getUrl(AppController.caseFollowupRecord),
		method: AppController.caseFollowupRecord.type.valueOf(),
		response: ({ query }) => {
			const { type } = query;
			const mockData = mockjs.mock({
				"records|1-5": [
					{
						id: mockjs.Random.natural().toString(),
						type,
						caseId: mockjs.Random.natural().toString(),
						overduePeriod: mockjs.Random.natural().toString(),
						followupType: "@cname",
						followTime: mockjs.Random.natural().toString(),
						operatorRealName: "@cname",
						targetName: "@cname",
						relationship: "@cname",
						addressDetail: mockjs.Random.natural().toString(),
					},
				],
			});
			return mockData.records;
		},
	},
	{
		url: getUrl(AppController.viewAppCaseFollowupRecord),
		method: AppController.viewAppCaseFollowupRecord.type.valueOf(),
		response: ({ query }) => {
			const { type } = query;
			const mockData = mockjs.mock({
				"records|1": [
					{
						type,
						followContent: "@cname",
						collectionProgress: mockjs.Random.natural().toString(),
						nextFollowUpTime: "@cname",
						targetName: "@cname",
						relationship: "@cname",
						addressStatus: mockjs.Random.natural().toString(),
						addressDetail: mockjs.Random.natural().toString(),
						fileIds: "@cname",
					},
				],
			});
			return mockData.records;
		},
	},
	{
		url: getUrl(AppController.getOverdueCaseList),
		method: AppController.getOverdueCaseList.type.valueOf(),
		response: ({ query }) => {
			const { type } = query;
			const mockData = mockjs.mock({
				"records|1-10": [
					{
						personalNo: mockjs.Random.natural(10, 100).toString(),
						personalName: "@cname",
						sex: "@cname",
						age: "@cname",
						marital: "@cname",
						detail: "@cname",
						overdueAmount: mockjs.Random.natural(10, 100).toString(),
						overduePeriod: mockjs.Random.natural(10, 100).toString(),
						overdueDays: mockjs.Random.natural(10, 100).toString(),
					},
				],
			});
			return mockData.records;
		},
	},
	{
		url: getUrl(AppController.getPersonalAddress),
		method: AppController.getPersonalAddress.type.valueOf(),
		response: ({ query }) => {
			const { type } = query;
			const mockData = mockjs.mock({
				"records|1-10": [
					{
						contName: "@cname",
						relation: "@cname",
						dataSource: "@cname",
						addressStatus: "@cname",
						addressType: "@cname",
						detail: "@cname",
						applyStatus: "@cname",
						overdueAmount: mockjs.Random.natural(10, 100).toString(),
						personalId: mockjs.Random.natural(10, 100).toString(),
						id: mockjs.Random.natural(10, 100).toString(),
					},
				],
			});
			return mockData.records;
		},
	},
] as MockMethod[];

function getUrl(server: IRequestServerConfig) {
	const { service, path } = server;
	if (service) {
		return ["/", service, path].join("");
	} else {
		return path;
	}
}
