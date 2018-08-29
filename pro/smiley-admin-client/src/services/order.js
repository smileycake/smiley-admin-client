import { stringify } from 'qs';
import request from '../utils/request';

export async function queryOrders() {
  return request('/api/orders');
}
