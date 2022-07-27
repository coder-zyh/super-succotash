<template>
	<van-nav-bar
		class="component report-date"
		right-text="添加项目"
		@click-right="rightClick"
	>
		<template #title>
			<div class="report-date_title" @click="show = !show">
				<span>{{ date }}</span>
				<van-icon
					class="report-date_title__icon"
					color="#000"
					:name="show ? 'arrow-up' : 'arrow-down'"
				/>
			</div>
		</template>
	</van-nav-bar>
	<van-calendar
		v-model:show="show"
		color="#1989fa"
		:max-date="today"
		:min-date="lastMonth"
		@confirm="onConfirm"
	></van-calendar>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Calendar, CalendarDayItem } from "vant";
import { useFilter } from "@/utils/hook.service";
import dayjs from "dayjs";

export default defineComponent({
	name: "ReportDate",
	components: {
		[Calendar.name]: Calendar,
	},
	props: {
		date: String,
	},
	emits: ["append", "update:date"],
	setup(props, ctx) {
		const show = ref(false);

		const filter = useFilter();

		const onConfirm = (val: Date) => {
			ctx.emit("update:date", filter.dateFormat(val));
			show.value = false;
		};

		const today = new Date();
		const lastMonth = dayjs(today).add(-1, "M").toDate();

		// 格式化日期 TODO
		const formatter = (day: CalendarDayItem) => {
			const date = day.date!;
			if (date.getDay() === 1) {
				day.type = "disabled";
			}
			return day;
		};

		return {
			today,
			lastMonth,
			show,
			onConfirm,
			rightClick: () => ctx.emit("append"),
			// formatter,
		};
	},
});
</script>

<style lang="less" scoped>
.report-date {
	&_title {
		font-weight: bold;
		&__icon {
			margin-left: 8px;
		}
	}
}
</style>
