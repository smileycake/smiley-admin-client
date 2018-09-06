import request from '../utils/request';

export async function queryMaterials() {
  return request('/api/materials');
}
