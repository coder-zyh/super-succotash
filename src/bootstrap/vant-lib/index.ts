import {
	ShareSheet,
	Cell,
	Button,
	Circle,
	Tabbar,
	TabbarItem,
	List,
	Loading,
	CellGroup,
	Row,
	Image,
	Form,
	Field,
	Uploader,
	Popup,
	Picker,
	Step,
	Steps,
	Divider,
	Icon,
	Tabs,
	Tab,
	NavBar,
	Search,
	Col,
	ActionSheet,
	Empty,
	Collapse,
	CollapseItem,
	Dialog,
	PullRefresh,
} from "vant";

/**
 * 用到的vant组件
 */
const vantLib = {
	install(Vue: { component: (arg0: string, arg1: any) => void }) {
		Vue.component(Button.name, Button);
		Vue.component(ShareSheet.name, ShareSheet);
		Vue.component(Cell.name, Cell);
		Vue.component(CellGroup.name, CellGroup);
		Vue.component(Row.name, Row);
		Vue.component(Circle.name, Circle);
		Vue.component(Tabbar.name, Tabbar);
		Vue.component(TabbarItem.name, TabbarItem);
		Vue.component(List.name, List);
		Vue.component(Loading.name, Loading);
		Vue.component(Image.name, Image);
		Vue.component(Form.name, Form);
		Vue.component(Field.name, Field);
		Vue.component(Uploader.name, Uploader);
		Vue.component(Popup.name, Popup);
		Vue.component(Picker.name, Picker);
		Vue.component(Step.name, Step);
		Vue.component(Steps.name, Steps);
		Vue.component(Divider.name, Divider);
		Vue.component(Icon.name, Icon);
		Vue.component(Tabs.name, Tabs);
		Vue.component(Tab.name, Tab);
		Vue.component(NavBar.name, NavBar);
		Vue.component(Search.name, Search);
		Vue.component(Col.name, Col);
		Vue.component(ActionSheet.name, ActionSheet);
		Vue.component(Empty.name, Empty);
		Vue.component(Collapse.name, Collapse);
		Vue.component(CollapseItem.name, CollapseItem);
		Vue.component(PullRefresh.name, PullRefresh);
		Vue.component(Dialog.name, Dialog);
	},
};
export default vantLib;
