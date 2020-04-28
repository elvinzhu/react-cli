import { useEffect } from 'react';
import _ from 'lodash';
import { getState, cloneState, dispatch, subscribe, subscribeTree } from './index';
import logger from '@/logger';

export const Prefix = 'formValues.';

export function setFormValue(payload, value) {
  logger.log('setFormValue:', payload, value);
  if (payload) {
    if (typeof payload === 'string') {
      dispatch(Prefix + payload, value);
      return;
    }
    const newPayload = {};
    for (let key in payload) {
      if (key) {
        newPayload[Prefix + key] = payload[key]
      }
    }
    dispatch(newPayload)
  }
}

export function getFormValue(prop, defaultValue) {
  if (prop) {
    let value = getState(Prefix + prop);
    return value === undefined ? defaultValue : value;
  }
}

export function cloneFormValue(prop, defaultValue) {
  if (prop) {
    let value = cloneState(Prefix + prop);
    return value === undefined ? defaultValue : value;
  }
}

export function subscribeChange(callback, path, flag) {
  if (path && callback) {
    if (flag) {
      return subscribeTree(callback, Prefix + path)
    }
    return subscribe(callback, Prefix + path)
  }
}

export function getPropPath(current, target) {
  if (target && /\./.test(current)) {
    return current.replace(/\.[^\.]+$/, '.' + target)
  }
  return target;
}

export function Subscription({ subscription, name, onChange }) {
  useEffect(() => {
    return subscribeChange(value => {
      logger.log('trigger subscription change for', name || subscription, value)
      onChange(value, name)
    },
     /\./.test(subscription)
      ? subscription
      : getPropPath(name, subscription))
  }, []);

  return null;
}
