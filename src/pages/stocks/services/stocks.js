import request from "../../../utils/request";
import { PAGE_SIZE } from "../../../utils/commonConstants";

export function fetchStockList({ page = 1 }) {
  return request(`/api/stocks?_page=${page}&_limit=${PAGE_SIZE}`);
}
