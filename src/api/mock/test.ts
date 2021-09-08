import { MockMethod } from "vite-plugin-mock";
import mockjs from "mockjs";

export default [
	{
		url: "/api/caseList",
		method: "get",
		response: ({ query }) => {
			const { type } = query;
			const mockData = mockjs.mock({
				"records|0-20": [
					{
						id: mockjs.Random.natural().toString(),
						name: "@cname",
						type,
					},
				],
			});
			return mockData.records;
		},
	},
] as MockMethod[];
