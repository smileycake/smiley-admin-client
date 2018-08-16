import request from "../../../utils/request";

export function fetchCakeList() {
  return request("/api/cakeList");
}
