// 提交订单数据
export const ORDER_DATA = 'ORDER_DATA';
// 试算数据
export const TRIAL_DATA = 'TRIAL_DATA';
// 试算结果
export const TRIAL_RET = 'TRIAL_RET';

export const STATE = 'STATE';
export const FILES = 'FILES';
// 需要做智能健告的被保险人列表
export const HN_INSURED = "HN_INSURED";
// 当前在做智能健告的被保险人索引
export const HN_APPLY_NO = 'HN_APPLY_NO';
// 智能问卷编码
export const HN_CODE = 'HN_CODE';
// 疾病列表
export const HN_DISEASE = 'HN_DISEASE';
// 所有问题
export const HN_QUESTIONS = 'HN_QUESTIONS';
// 问题回答结果
export const HN_RESULT = 'HN_RESULT';


export default {
  get(key) {
    try {
      return JSON.parse(window.sessionStorage.getItem(key))
    } catch (err) {
      console.error(err)
    }
  },
  set(key, data) {
    window.sessionStorage.setItem(key, JSON.stringify(data));
  }
}

// const testData = {"timestamp":1586504456459,"state":{"templateId":"1443","formValues":{"electronicInvoice":{"invoiceType":"03"},"__112_1600003984_332":"50000","__112_1600003985_333":"2000","__112_1600003986_334":"10","__insurenotify_radio0":"no","__insurenotify_radio1":"no","__insurenotify_radio2":"no","__insurenotify_radio3":"no","__insurenotify_radio4":"no","policyHolder":{"name":"朱永玉","certiNo":"110101199003077336","birthday":"1990-03-07","gender":"M","birthday_disabled":true,"gender_disabled":true,"certiType":"I","phoneNo":"15200000000","email":"qq@qq.com","insureRegion":"110000,110000,110000","address":"asdfasd ","zipCode":"15200000"},"deliveryInfo":{"email":"qq@qq.com","postType":"1"},"insured":[{"holderRelation":"SELF","name":"朱永玉","occupation":"000101","addressSameWithHolder":"Y","hasOtherInsurance":"Y","riskManagerLevel":"1","educationLevel":"1"},{"holderRelation":"SPOUSE","name":"安兔兔","certiNo":"110101199003070070","birthday":"1990-03-07","gender":"M","birthday_disabled":true,"gender_disabled":true,"certiType":"I","occupation":"000101","addressSameWithHolder":"Y","hasOtherInsurance":"Y","riskManagerLevel":"1","educationLevel":"3"}],"beneficiary":[[{"benefitSpecialType":"LEGAL"}],[{"benefitSpecialType":"LEGAL"}]],"common":{"insuranceEndDate":"2021-04-22"}}}};
// window.sessionStorage.setItem(STATE, JSON.stringify(testData))
