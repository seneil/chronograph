import { API_ENTRY } from '@constants';

export const openChronographyWindow = async () => (
  await window[API_ENTRY.SERVICE].openChronographyWindow()
);

export const openActivityAppendWindow = async () => (
  await window[API_ENTRY.SERVICE].openActivityAppendWindow()
);

export const refreshMenuBarWindowIcon = (active: boolean)=> (
  window[API_ENTRY.SERVICE].refreshMenuBarWindowIcon(active)
);

export const quitApplication = () => (
  window[API_ENTRY.SERVICE].quitApplication()
);
