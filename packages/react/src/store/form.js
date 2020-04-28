import { getState, dispatch, subscribe } from './index';

export const Prefix = 'formValues.';

export function setFormValue(payload, value) {
  console.log('[H5] setFormValue:', payload, value);
  if (typeof payload === 'string') {
    dispatch(Prefix + payload, value);
    return;
  }
  const newPayload = {};
  for (let key in payload) {
    newPayload[Prefix + key] = payload[key]
  }
  dispatch(newPayload)
}

export function getFormValue(prop, defaultValue) {
  if (prop) {
    const value = getState(Prefix + prop);
    return value === undefined
      ? defaultValue
      : value;
  }
}

export function subscribeChange(callback, path) {
  if (path && callback) {
    return subscribe(callback, Prefix + path)
  }
}

export function getPropPath(current, target) {
  if (/\./.test(current)) {
    return current.replace(/\.[^\.]+$/, '.' + target)
  }
  return target;
}
