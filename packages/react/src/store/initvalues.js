
// 需要持久化到本地存储的数据key值
export const STATE_KEYS_NEED_TO_BE_PERSISTED = [
  'templateId',
  'orderNo',
  'currentPage',
  'currentUrl',
  'currentPlan',
  'currentPlanInfo',
  'trialPrice',
  'totalTrialPrice',
  'trialExtraFields',
  'trialFactors',
  'policyHolderFields',
  'fiterLiablities',
  'formValues'
];

export default {
  templateId: '',
  orderNo: '',
  // 当前页面
  currentPage: '1',
  currentUrl: '',
  // 当前保障计划 & 配置流程操作：切换计划
  currentPlan: 0,
  currentPlanInfo: {},
  // 详情有页面试算结果
  trialPrice: '--',
  // 填写信息页面试算结果（多被保人）
  totalTrialPrice: '--',
  // 整个配置数据
  configJson: {},
  // 表单验证相关
  validateImediately: false,
  // 投保人字段
  policyHolderFields: [],
  // 最大被保险人数
  maxInsurant: 1, // warn: 该字段不能持久化存储，因为要参与智能核保那边是否是多被保人判断
  // 最小被保险人数
  minInsurant: 1,
  // 发生改动的表单数据（不包括默认值）
  formValues: {},
  // 产品组合
  packages: null,
  orderDetail: null,
  // 字段组件映射关系
  mappings: {},
  // 健告接口内容
  healthNotify: null,
  // 配置流程操作：投保告知预览弹框
  notifyModal: {
    show: false,
    message: ''
  },
  // 配置流程操作：健康高告知预览弹框
  healthModal: {
    type: '', // 'refuse' | 'pass'
    text: ''
  },
  // 配置流程操作：切换投保结果
  resultStatus: 1
};
