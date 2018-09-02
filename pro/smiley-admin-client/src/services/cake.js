import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCakes() {
  return request('/api/cakes');
}
