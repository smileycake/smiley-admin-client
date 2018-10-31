import { stringify } from 'qs';
import request from '../utils/request';

export async function queryCakeList() {
  return request('/api/cake/list2');
}

export async function queryCakes() {
  return request('/api/cake/list');
}

export async function queryCakeDetail() {
  return request('/api/cake/detail');
}

export async function queryCakeType() {
  return request('/api/cake/type');
}
