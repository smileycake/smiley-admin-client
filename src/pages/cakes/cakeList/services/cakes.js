import { PAGE_SIZE } from '../../../../utils/commonConstants';
import request from '../../../../utils/request';

export function fetch({ page = 1 }) {
    return request(`/api/cakes?_page=${page}&_limit=${PAGE_SIZE}`);
}