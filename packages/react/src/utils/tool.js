import _ from 'lodash';

let _queryParams = null, _lastSearch = '';
let _hashParam = null, _lastHash = '';

export {
  // form
  getFormValues,
  getFormKeys,
  updateFormKey,
  rerangeFormKey,
  // param
  toParam,
  parseParam,
  getQueryParam,
  getHashParam,
  // mode
  isPreviewMode,
  isSimulateMode,
  isTemplateMode,
  isTemplateToolMode,
  isNormalMode,
  // date
  parseDate,
  formatDate,
  addDay,
  addMonth,
  addYear,
  // others
  getScrollTop,
  toWan,
  hasValue,
  getValue,
  getStringValue,
  getValuePath,
  // 信息提取
  toAge,
  getBirthday,
  getSex
}

function getValuePath(
  value, list,
  valueMember = "value",
  childrenMember = 'children'
) {
  const path = [];
  if (list && list.length && hasValue(value)) {
    for (let i = 0, len = list.length; i < len; i++) {
      let item = list[i];
      path.push(item);
      if (item[valueMember] === value) {
        return path;
      }
      const childPath = getValuePath(value, item[childrenMember], valueMember, childrenMember);
      if (childPath.length) {
        return path.concat(childPath)
      } else {
        path.pop();
      }
    }
  }
  return path;
}

function getStringValue(value) {
  if (value instanceof Array) {
    return value.join(',')
  }
  return hasValue(value) ? String(value) : ''
}

function getValue(value) {
  return hasValue(value) ? value : ''
}

function hasValue(val) {
  return val || val === 0 || val === false
}

function toWan(num) {
  if (num > 10000) {
    return (num / 10000) + '万'
  }
  if (num === null
    || num === undefined
    || window.isNaN(num)
  ) {
    return '';
  }
  return num
}

function getQueryParam() {
  if (!_queryParams || _lastSearch !== window.location.search) {
    _lastSearch = window.location.search;
    _queryParams = parseParam(_lastSearch.substr(1));
  }
  return _queryParams;
}

function getHashParam() {
  if (!_hashParam || _lastHash !== window.location.hash) {
    _lastHash = window.location.hash;
    _hashParam = parseParam(_lastHash.substr(1));
  }
  return _hashParam;
}

// 中台配置的时候中间iframe预览, 配置数据从postmesage拿
// 或者模板配置工具使用
// 有点选框， 无法交互
function isPreviewMode() {
  return getQueryParam().mode === 'preview'
    || isTemplateToolMode()
}

// 手机扫二维码预览，配置数据从接口拿
function isSimulateMode() {
  return getQueryParam().mode === 'simulate'
}

// 纯预览模板，配置数据从postmesage拿
// 无 点选框
// 配置流程 + 模板工具使用
function isTemplateMode() {
  return getQueryParam().mode === 'template'
}

// 模板配置工具
function isTemplateToolMode() {
  return window.__preview === true
}

function isNormalMode() {
  return !getQueryParam().mode
    && !isTemplateToolMode()
}

function updateFormKey(children, index) {
  // insurant.name => insurant[0].name
  // insurant[0].name => insurant[0][0].name
  const reg = /\.([a-z_]+)$/i;
  return children.map(item => {
    return {
      ...item,
      formKey: item.formKey && item.formKey.replace(
        reg,
        `[${index}].$1`
      )
    }
  })
}

function rerangeFormKey(children, index) {
  // insurant.name => insurant[1].name
  // insurant[0].name => insurant[1].name
  const reg = /(\[\d+\])?\.([a-z_]+)$/i;
  children.forEach(item => {
    if (item.formKey) {
      item.formKey = item.formKey.replace(
        reg,
        `[${index}].$2`
      )
    }
  })
}

function parseParam(paramStr, delimiter) {
  const obj = {};
  if (paramStr) {
    let arr = paramStr.split(delimiter || '&');
    arr.length && arr.forEach(function (item) {
      let tempArr = item.split('=');
      obj[tempArr[0]] = decodeURIComponent(tempArr[1] || '')
    })
  }
  return obj;
}

function toParam(data, encode) {
  let ret = '';
  if (_.isPlainObject(data)) {
    return Object.keys(data).map(item => {
      return item + '=' + (encode ? encodeURIComponent(data[item] || '') : data[item])
    }).join('&')
  }
  return ret;
}

function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function getFormValues(htmlForm, formKeys) {
  const value = {}, form = htmlForm || window.document.forms[0];
  if (formKeys) {
    formKeys.forEach(item => {
      if (form[item]) {
        _.set(value, item, form[item].value)
      }
    })
  } else {
    const eles = form.elements, len = eles.length;
    for (let i = 0; i < len; i++) {
      if (eles[i].name && eles[i].tagName === 'INPUT') {
        _.set(value, eles[i].name, eles[i].value)
      }
    }
  }
  return value;
}

function getFormKeys(children) {
  const arr = [];
  if (children && children.length) {
    children.forEach(item => {
      if (item.formKey) {
        arr.push(item.formKey)
      }
      arr.concat(getFormKeys(item.children))
    })
  }
  return arr;
}

function addDay(date, num) {
  date = parseDate(date);
  if (typeof num === 'string') {
    num = +num
  }
  return new Date(date.setDate(date.getDate() + num));
}

function addMonth(date, num) {
  date = parseDate(date);
  if (typeof num === 'string') {
    num = +num
  }
  return new Date(date.setMonth(date.getMonth() + num));
}

function addYear(date, num) {
  date = parseDate(date);
  if (typeof num === 'string') {
    num = +num
  }
  return new Date(date.setFullYear(date.getFullYear() + num));
}

function parseDate(val) {
  if (!val) return '';
  if (typeof val === 'string') {
    val = val.replace(/-/g, '/');
  }
  var date = new Date(val);
  if (String(date) === 'Invalid Date') {
    return ''
  }
  return date;
}

function formatDate(date, fmt) {
  date = parseDate(date);
  if (!date) { return '' }
  if (!fmt) { fmt = 'yyyy-MM-dd' }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

function toAge(birthday) {
  const anchor = parseDate(birthday)
  if (anchor) {
    const now = new Date()
    let age = now.getFullYear() - anchor.getFullYear();
    if (now.getMonth() > anchor.getMonth()) {
      age += 1
    } else if (now.getMonth() === anchor.getMonth()) {
      if (now.getDate() > anchor.getDate()) {
        age += 1
      }
    }
    return age - 1
  }
  return '';
}

function getBirthday(idCard) {
  var birthday = "";
  if (idCard.length === 15) {
    birthday = "19" + idCard.substr(6, 6);
  } else if (idCard.length === 18) {
    birthday = idCard.substr(6, 8);
  }
  birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
  return birthday;
}

function getSex(idCard) {
  var sex = "";
  if (parseInt(idCard.substr(16, 1)) % 2 === 1) {
    return "M";
  } else {
    sex = "F";
  }
  return sex;
}
