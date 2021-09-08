<template>
	<div class="component home-top">
		<div class="home-top__info">
			<van-circle
				v-model:current-rate="currentRate"
				:rate="80"
				:clockwise="false"
				layer-color="#3d7ecc"
				color="white"
				size="220px"
				speed="60"
			>
				<div class="home-top__money">
					<div>
						<span class="home-top__money-round">
							{{ moneyRound }}
						</span>
						<span class="home-top__money-decimal">
							{{ moneyDecimal }}
						</span>
					</div>
					<div>待催收金额</div>
				</div>
			</van-circle>
			<div
				class="
					home-top__content
					flex-row
					justify-content-around
					align-items-center
				"
			>
				<div class="home-top__content_item">
					<div class="home-top__content_item-title">风险案件总数</div>
					<div>{{ riskCount }}</div>
				</div>
				<div class="home-top__content_splite-line"></div>
				<div class="home-top__content_item">
					<div class="home-top__content_item-title">逾期案件总数</div>
					<div>{{ overdueCount }}</div>
				</div>
				<div class="home-top__content_splite-line"></div>
				<div class="home-top__content_item">
					<div class="home-top__content_item-title">合计案件总数</div>
					<div>{{ caseCount }}</div>
				</div>
			</div>
		</div>
		<WaveBackground />
	</div>
</template>

<script lang="ts">
import { StringMust } from "@/utils/usePropType";
import { computed, defineComponent } from "vue";
import WaveBackground from "./WaveBackground.vue";

export default defineComponent({
	name: "HomeTop",
	components: { WaveBackground },
	props: {
		totalMoney: StringMust,
		riskCount: Number,
		overdueCount: Number,
		caseCount: Number,
	},
	setup(props) {
		const moneyRound = computed(() =>
			props.totalMoney.replace(/([\d,]+)(.*)/, "$1")
		);
		const moneyDecimal = computed(
			() => props.totalMoney.replace(/([\d,]+)(.*)/, "$2") + "元"
		);

		return {
			moneyRound,
			moneyDecimal,
		};
	},
	data() {
		return {
			currentRate: 0,
		};
	},
});
</script>

<style lang="less" scoped>
.home-top {
	&__info {
		color: white;
		padding-top: 30px;
		background-image: linear-gradient(0deg, #0062ad 0%, #5fb1f0 100%),
			linear-gradient(#64a1eb, #64a1eb);
		background-blend-mode: normal, normal;
	}
	&__content {
		margin-top: 24px;
		height: 50px;
		&_item {
			font-size: 18px;
			&-title {
				font-size: 12px;
				color: #cae2ff;
				margin-bottom: 5px;
			}
		}
		&_splite-line {
			width: 1px;
			height: 100%;
			background: #b2d5ff;
		}
	}
	&__money {
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		&-round {
			font-size: 24px;
		}
		&-decimal {
			font-size: 16px;
		}
	}
}
</style>
