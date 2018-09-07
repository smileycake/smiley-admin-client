import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCakes() {
  return request('/api/cake/list');
}

export async function queryCakeDetail() {
  return request('/api/cake/detail');
}
