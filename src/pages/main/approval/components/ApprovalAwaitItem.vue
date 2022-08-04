<template>
	<div class="component approval-await-item">
		<div class="approval-await-item_content">
			<div class="approval-await-item_title">{{ item.userName }}</div>
			<div class="approval-await-item_info">
				<span class="approval-await-item_info__label">项目名称：</span>
				{{ item.projectName }}
			</div>
			<div class="approval-await-item_info">
				<span class="approval-await-item_info__label">工时：</span>
				{{ item.day }}
			</div>
			<div class="approval-await-item_info">
				<span class="approval-await-item_info__label">预估费用：</span>
				{{ item.amount }}
			</div>
		</div>
		<div
			v-if="!multiple"
			class="approval-await-item_footer van-hairline--top flex align-items-center"
		>
			<div class="flex-span-6 approval-await-item_footer__date">{{ date }}</div>
			<div
				class="flex-span-3 approval-await-item_footer__button approval-await-item_footer__button-refuse"
			>
				<van-button type="primary" plain @click="$emit('submit', 2, item.id)">
					拒绝
				</van-button>
			</div>
			<div class="flex-span-3 approval-await-item_footer__button">
				<van-button type="primary" plain @click="$emit('submit', 1, item.id)">
					同意
				</van-button>
			</div>
		</div>
		<div v-else class="approval-await-item_footer__date">{{ date }}</div>
	</div>
</template>

<script lang="ts" setup>
import { FilterService } from "@/utils/filter.service";

defineEmits(["submit"]);

const props = defineProps({
	multiple: Boolean,
	item: {
		type: Object,
		default() {
			return {};
		},
	},
});
const date = new FilterService().dateFormat(props.item.fromDate);
</script>

<style lang="less" scoped>
.component.approval-await-item {
	.approval-await-item {
		&_content {
			font-size: 14px;
			padding: 8px 12px;
		}
		&_title {
			font-size: 18px;
			margin-bottom: 4px;
		}
		&_info {
			margin-top: 2px;
			&__label {
				color: #999;
				display: inline-block;
				width: 70px;
			}
		}

		&_footer {
			&__date {
				padding-left: 12px;
				color: #ccc;
				text-align: left;
				font-size: 13px;
				height: 26px;
				line-height: 26px;
			}
			&__button {
				.van-button {
					border: none;
					height: 38px;
				}
			}
			&__button-refuse {
				text-align: right;
			}
		}
	}
}
</style>
