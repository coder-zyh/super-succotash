<!-- eslint-disable vue/no-dupe-keys -->
<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
	<div class="report">
		<head-top>报工</head-top>
		<!-- 选择时间 -->
		<van-dropdown-menu>
			<van-dropdown-item v-model="date.value" :options="date.option" />
		</van-dropdown-menu>
		<!-- 报工项目 -->
		<report-item
			v-for="(item, index) in projects"
			:key="item.code"
			:index="index"
			@chooseProject="chooseProject"
		/>
		<!-- 点击添加项目 -->
		<van-cell value="添加项目" icon="plus" class="push" @click="pushItem" />
		<!-- 展示总计 -->
		<div v-show="totalShow" class="total">
			<van-cell-group title="总计">
				<van-cell title="合计工时：" :value="sumTimes" />
			</van-cell-group>
		</div>
		<van-button type="primary" round size="large" class="btn" @click="submit">
			提交
		</van-button>
	</div>
</template>
<script>
import HeadTop from "@/components/HeadTop.vue";
import ReportItem from "./children/ReportItem.vue";

export default {
	name: "Report",
	components: { HeadTop, ReportItem },
	data() {
		return {
			date: {
				value: 0,
				option: [],
			},
			projectss: [],
			projects: [{}],
			totalShow: false,
		};
	},
	computed: {
		// eslint-disable-next-line vue/no-dupe-keys
		sumTimes() {
			let time = 0;
			this.projectss.forEach((item) => {
				time += Number(item.time);
			});
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			this.sumTimes = time;
			return time;
		},
	},
	created() {
		// 设置默认日期
		this.date.option.push({
			text: this.parseTime(new Date()),
			value: this.parseTime(new Date()),
		});
		this.date.value = this.parseTime(new Date());
		// 获取能选择日期列表
		this.getDateList();
	},
	methods: {
		// 转义时间格式
		parseTime(value) {
			const year = value.getFullYear();
			const month = value.getMonth() + 1;
			const date = value.getDate();
			return year + "-" + month + "-" + date;
		},
		// 添加项目
		pushItem() {
			this.projects.push({});

			this.totalShow = true;
		},
		// 添加项目内容
		chooseProject(e) {
			// for (let i in e) {
			// 	this.projects[e.index][i] = e[i];
			// }
			this.projectss[e.index] = e;
			console.log(this.projects, this.projectss);
		},
		getDateList() {
			this.date.option.push({ text: "2020-10-16", value: "2020-10-16" });
		},
		// 提交
		submit() {
			const form = {
				date: this.date.value,
				projects: this.projectss,
			};
			console.log(form);
		},
	},
};
</script>
<style scoped>
.push {
	text-align: center;
}
.btn {
	margin-top: 50px;
}
</style>
