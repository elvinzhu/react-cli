import request from '@/utils/request';
import withCache from './decorator/cache';

// 职业列表数据
export const getIndustryList = withCache(() => {
  return request('/api/cmds/queryOccupationList', {
    method: 'POST'
  })
})