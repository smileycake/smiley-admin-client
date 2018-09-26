import { stringify } from 'qs';
import request from '../utils/request';

export async function queryRecipes() {
  return request('/api/recipes');
}
