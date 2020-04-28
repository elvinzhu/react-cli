import { createStore } from 'redux';
import _ from 'lodash';
import initialState, { STATE_KEYS_NEED_TO_BE_PERSISTED } from './initvalues';
import session, { STATE } from './session';
import { getQueryParam, isPreviewMode } from '../utils/tool';
import logger from '@/logger';

if (!isPreviewMode()) {
  // eslint-disable-next-line
  const { timestamp, state = {} } = session.get(STATE) || {};
  const newTemplateId = getQueryParam().templateRelationId;
  if (state && (!newTemplateId || state.templateId === newTemplateId)) {
    // TODO: 考虑过期检查
    Object.assign(initialState, state);
  } else if (newTemplateId) {
    initialState.templateId = newTemplateId;
  }
}

function reducer(state = initialState, { type, payload }) {
  const newState = { ...state };
  if (type === 'set') {
    for (let key in payload) {
      _.set(newState, key, payload[key])
    }
  }
  return newState;
}

const store = createStore(reducer);

store.subscribe(_.debounce(() => {
  const dataToPersist = _.pick(store.getState(), STATE_KEYS_NEED_TO_BE_PERSISTED);
  session.set(STATE, { timestamp: Date.now(), state: dataToPersist })
}), 300);

/**
 * 监听某路径下值的变化，适合值类型或者引用发生变化的引用类型
 */
export function subscribe(callback, path) {
  logger.log('add subscribe for:', path);
  let oldState = getState(path);
  return store.subscribe(_.debounce(() => {
    const newState = getState(path);
    if (newState !== oldState) {
      logger.log('store subscribe callback for:', path, newState);
      oldState = newState;
      callback(newState, store)
    }
  }, 300));
}

/**
 * 监听某路径下整个树形结构的变化，适合所有类型，开销比subscribe大
 */
export function subscribeTree(callback, path) {
  logger.log('add subscribeTree for:', path);
  let oldState = JSON.stringify(getState(path));
  return store.subscribe(_.debounce(() => {
    const newState = JSON.stringify(getState(path));
    if (newState !== oldState) {
      logger.log('store subscribeTree callback for:', path);
      oldState = newState;
      callback(JSON.parse(newState), store)
    }
  }, 300))
}

// TODO: debounce dispatch
export function dispatch(payload, value) {
  if (typeof payload === 'string') {
    payload = {
      [payload]: value
    }
  }
  logger.log('store dispath:', payload);
  return store.dispatch({ type: 'set', payload })
}

export function getState(path) {
  const state = store.getState();
  return path ? _.get(state, path) : state
}

export function cloneState(path) {
  const value = getState(path);
  return typeof value === 'object' ? _.cloneDeep(value) : value;
}

// TODO: 投保完成，调此清理数据
export function clearCache() {
  window.localStorage.removeItem(STATE)
}

window.store = store;
/*
store.dispatch({
  type: 'set',
  payload: {
    healthModal: {
      type: 'refuse', // 'refuse' | 'pass'
      text: 'sdfasdfasdfas'
    }
  }
})
*/
