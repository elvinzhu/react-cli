
// 需要持久化到本地存储的数据key值
export const STATE_KEYS_NEED_TO_BE_PERSISTED = [
  'currentPage',
  'currentUrl',
  'totalTrialPrice',
  'trialExtraFields',
  'trialFactors',
  'policyHolderFields',
  'insurantFields',
  'formValues'
];

export default {
  // 当前页面
  currentPage: '1',
  currentUrl: '',
  // 详情有页面试算结果
  trialPrice: '--',
  // 填写信息页面试算结果（多被保人）
  totalTrialPrice: '--',
  // 试算的一些额外字段
  trialExtraFields: {},
  // 试算因子
  trialFactors: {},
  // 整个配置数据
  configJson: {},
  // 表单验证相关
  validateImediately: false,
  // 投保人字段
  policyHolderFields: [],
  // 被保险人字段
  insurantFields: [],
  // 当前表单一些共享数据
  formValues: {},
  // 配置流程的一些行为
  behavior: {
    // 投保结果(流程配置时用到)
    resultStatus: 1,
    // 投保告知预览弹框
    notifyModal: { show: false, message: '' }
  }
};
