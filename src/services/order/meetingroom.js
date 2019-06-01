import request from '../../utils/request'
import config from '../../config/config'
const { api } = config
const { meetingroomOrders, meetingroomOrder } = api

export async function query (params) {
  return request({
    url: meetingroomOrders,
    method: 'get',
    data: params,
  })
}

export async function get (params) {
  console.log(params);
  return request({
    url: meetingroomOrder,
    method: 'get',
    data: params,
  })
}
