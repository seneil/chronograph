import { API_ENTRY } from '@constants';

export const fetchChronography = async () => {
  return await window[API_ENTRY.FETCHER].fetchChronography();
}
