import request from "../../../../utils/request";

export function fetchOrderDetail({ orderId }) {
  return request(`/api/orderDetail?_orderId=${orderId}`);
}

export function fetchOrderList({ page }) {
  return request(`/api/orders?_page=${page}`);
}
