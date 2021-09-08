<template>
	<div class="page customer-repair">
		<ZwNavBar />
		<div class="page_content">
			<van-form @submit="onSubmit">
				<van-field
					v-model="repairInfo.relation"
					readonly
					required
					clickable
					name="relation"
					label="关系"
					placeholder="点击选择关系"
					:rules="[{ required: true, message: '请选择关系' }]"
					@click="fieldClick('relation')"
				/>
				<van-field
					v-model="repairInfo.contName"
					required
					name="contName"
					label="姓名"
					placeholder="姓名"
					:rules="[{ required: true, message: '请填写姓名' }]"
				/>
				<van-field
					v-model="repairInfo.phoneType"
					readonly
					clickable
					name="phoneType"
					label="电话类型"
					placeholder="点击选择电话类型"
					@click="fieldClick('phoneType')"
				/>
				<van-field
					v-model="repairInfo.phone"
					name="phone"
					label="联系电话"
					type="digit"
					placeholder="请输入联系电话"
				/>
				<van-field
					v-model="defaultStatus.phoneStatus"
					disabled
					name="phoneStatus"
					label="电话状态"
				/>
				<van-field
					v-model="repairInfo.dataSource"
					readonly
					clickable
					name="dataSource"
					required
					label="数据来源"
					placeholder="点击选择数据来源"
					:rules="[{ required: true, message: '请选择数据来源' }]"
					@click="fieldClick('dataSource')"
				/>
				<van-field
					v-model="repairInfo.addressType"
					readonly
					name="addressType"
					label="地址类型"
					placeholder="点击选择地址类型"
					@click="fieldClick('addressType')"
				/>
				<van-field
					v-model="defaultStatus.addressStatus"
					disabled
					readonly
					clickable
					name="addressStatus"
					label="地址状态"
				/>
				<van-field
					v-model="repairInfo.detail"
					name="detail"
					label="详细地址"
					placeholder="请输入详细地址"
					maxlength="50"
				/>
				<van-popup v-model:show="state.showPicker" position="bottom">
					<van-picker
						:columns="columns"
						@confirm="onConfirm"
						@cancel="state.showPicker = false"
					/>
				</van-popup>
				<div class="customer-repair__style">
					<p>说明:</p>
					<p>联系人信息或者地址信息至少填写一项，不能两者都为空</p>
				</div>
				<div style="margin: 16px">
					<van-button
						round
						block
						type="primary"
						native-type="submit"
						:loading="btnloading"
					>
						提交
					</van-button>
				</div>
			</van-form>
		</div>
	</div>
</template>
<script lang="ts">
//新增信息
import { defineComponent, ref, reactive, provide } from "vue";
import { StringMust } from "@/utils/usePropType";
import { AppService } from "@/api/services/app.service";
import { RequestParams } from "@gopowerteam/http-request";
import { RepairInfo } from "@/types/repairInfo.interface";
import { useDict } from "@/utils/hook.service";
import { useRouter } from "vue-router";
export default defineComponent({
	name: "CustomerRepair",
	props: {
		caseId: StringMust,
	},
	setup(props) {
		// 提供caseId
		provide("caseId", props.caseId);
		const state = reactive({
			selectData: null,
			value: null,
			showPicker: false,
			relation: false,
			phoneType: false,
			addressStatus: false,
			addressType: false,
			region: false,
		});
		const columns = ref([]);
		const dataSource = ref([]);
		const value = ref([{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }]);
		const service = new AppService();
		// 写死的电话和地址状态 不用传
		const defaultStatus = reactive({
			phoneStatus: "正常",
			addressStatus: "有效地址",
		});
		const newrepairInfo = reactive({
			addressType: null,
			relation: null,
			phoneType: null,
		});
		const repairInfo = reactive<RepairInfo>({
			contName: null,
			relation: null,
			phoneType: null,
			personalId: null,
			phone: null,
			addressType: null,
			detail: null,
			caseId: props.caseId,
			dataSource: null,
		});
		const router = useRouter();
		const btnloading = ref(false);
		const onSubmit = (values) => {
			btnloading.value = true;
			const params = { ...repairInfo, ...newrepairInfo };
			if (!params["detail"]) {
				params["detail"] = null;
			}
			if (!params["phone"]) {
				params["phone"] = null;
			}
			service.repairInfo(new RequestParams(params)).subscribe({
				next: (value: any) => {
					btnloading.value = false;
					router.back();
				},
				error: (err) => {
					btnloading.value = false;
				},
			});
		};
		function fieldClick(val: any) {
			let param = "";
			// Relationship
			switch (val) {
				case "relation":
					param = "Relationship";
					break;
				case "phoneType":
					param = "PhoneType";
					break;
				case "addressStatus":
					param = "AddressStatus";
					break;
				case "addressType":
					param = "AddressType";
					break;
				case "dataSource":
					param = "DataSource";
					break;
			}
			const dictService = useDict();
			dataSource.value = dictService.getDictData(param);
			columns.value = dataSource.value.map((item) => item.name);
			state.showPicker = true;
			state.selectData = val;
		}
		const onConfirm = (value: any, index) => {
			repairInfo[state.selectData] = value;
			newrepairInfo[state.selectData] = dataSource.value[index].code;
			state.showPicker = false;
		};
		return {
			state,
			columns,
			onConfirm,
			value,
			onSubmit,
			repairInfo,
			fieldClick,
			defaultStatus,
		};
	},
});
</script>

<style lang="less" scoped>
.customer-repair__style {
	text-align: left;
	font-size: 14px;
	color: #ccc;
	padding-left: 16px;
}
</style>
