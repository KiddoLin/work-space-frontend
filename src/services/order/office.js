import request from '../../utils/request'
import config from '../../config/config'
const { api } = config
const { officeOrders, officeOrder } = api

export async function query (params) {
  return request({
    url: officeOrders,
    method: 'get',
    data: params,
  })
}

export async function get (params) {
  console.log(params);
  return request({
    url: officeOrder,
    method: 'get',
    data: params,
  })
}
