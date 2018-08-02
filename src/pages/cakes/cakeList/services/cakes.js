import { PAGE_SIZE } from "../../../../utils/commonConstants";
import request from "../../../../utils/request";

export function fetch({ page = 1 }) {
  return request(`/api/cakes?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function fetchCakeMaterials() {
  return request("/api/materials");
}

export function fetchCakeType() {
  return request("/api/cakeType");
}

export function fetchCakeDetail({ cakeId }) {
  return request(`/api/cakeDetail?_cakeId=${cakeId}`);
}

export function createCakeDetail(cakeDetail) {
  return request("/api/cakeDetail", {
    method: "POST",
    body: JSON.stringify(cakeDetail)
  });
}
