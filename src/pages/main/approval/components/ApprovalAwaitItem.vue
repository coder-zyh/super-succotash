<template>
	<div class="component approval-item">
		<div class="approval-item_content">
			<div class="approval-item_title">{{ unApprovalList.userName }}</div>
			<div class="approval-item_info">
				<span class="approval-item_info__label">项目名称：</span>
				{{ unApprovalList.projectName }}
			</div>
			<div class="approval-item_info">
				<span class="approval-item_info__label">工时：</span>
				{{ unApprovalList.day }}
			</div>
			<div class="approval-item_info">
				<span class="approval-item_info__label">预估费用：</span>
				{{ unApprovalList.amount }}
			</div>
		</div>
		<div
			v-if="!multiple"
			class="approval-item_footer van-hairline--top flex align-items-center"
		>
			<div class="flex-span-6 approval-item_footer__date">2022-06-13</div>
			<div
				class="flex-span-3 approval-item_footer__button approval-item_footer__button-refuse"
			>
				<van-button type="primary" plain @click="$emit('refuse')">
					拒绝
				</van-button>
			</div>
			<div class="flex-span-3 approval-item_footer__button">
				<van-button type="primary" plain @click="$emit('agree')">
					同意
				</van-button>
			</div>
		</div>
		<div v-else class="approval-item_footer__date">2022-06-13</div>
	</div>
</template>

<script lang="ts" setup>
defineEmits(["refuse", "agree"]);

const value = defineProps({
	multiple: Boolean,
	unApprovalList: {
		type: Object,
		default() {
			return {};
		},
	},
});
</script>

<style lang="less" scoped>
.component.approval-item {
	.approval-item {
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
