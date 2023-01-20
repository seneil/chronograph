import { API_ENTRY } from '@constants';

export const openActivityAppendWindow = async () => (
  await window[API_ENTRY.SERVICE].openActivityAppendWindow()
);
