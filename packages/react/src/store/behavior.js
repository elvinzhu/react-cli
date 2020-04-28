import { subscribe, dispatch } from './index';
import { isPreviewMode } from '@/utils/tool';

export const Prefix = 'behavior.';
export function notifyBehavior(payload, value) {
  if (isPreviewMode()) {
    console.log('[H5] notify behavior:', payload, value);
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
}

export function listenBehavior(callback, path) {
  if (isPreviewMode()) {
    return subscribe(callback, Prefix + path)
  }
}
