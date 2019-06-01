import request from '../../utils/request'
import config from '../../config/config'
const { api } = config
const { promotionOrders, promotionOrder } = api

export async function query (params) {
  return request({
    url: promotionOrders,
    method: 'get',
    data: params,
  })
}

export async function get (params) {
  console.log(params);
  return request({
    url: promotionOrder,
    method: 'get',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: promotionOrder,
    method: 'put',
    data: params,
  })
}
