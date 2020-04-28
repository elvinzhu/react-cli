import { createStore } from 'redux';
import _ from 'lodash';
import initialState, { STATE_KEYS_NEED_TO_BE_PERSISTED } from './initvalues';
import { STORE_STATE } from '@/utils/consts';

try {
  const storeData = window.sessionStorage.getItem(STORE_STATE);
  if (storeData) {
    const parsed = JSON.parse(storeData);
    // eslint-disable-next-line
    const { timestamp, state } = parsed;
    // TODO: 过期检查
    Object.assign(initialState, state);
  }
} catch (error) {
  console.error(error)
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
  window.sessionStorage.setItem(STORE_STATE, JSON.stringify({
    timestamp: Date.now(),
    state: dataToPersist
  }))
}), 300);

export function subscribe(callback, path) {
  console.log('[H5] add subscribe for:', path);
  let oldState = getState(path);
  return store.subscribe(() => {
    const newState = getState(path);
    if (newState !== oldState) {
      console.log('[H5] store subscribe callback for:', path);
      oldState = newState;
      callback(newState, store)
    }
  })
}

// TODO: debounce dispatch
export function dispatch(payload, value) {
  if (typeof payload === 'string') {
    payload = {
      [payload]: value
    }
  }
  return store.dispatch({ type: 'set', payload })
}

export function getState(path) {
  const state = store.getState();
  return path ? _.get(state, path) : state
}

// TODO: 投保完成，调此清理数据
export function clearCache() {
  window.localStorage.removeItem(STORE_STATE)
}

window.store = store;
