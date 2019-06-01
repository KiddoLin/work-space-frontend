import request from '../utils/request'
import config from '../config/config'
const { api } = config
const { spaces, space } = api

export async function genQrcode (params) {
  return request({
    url: api.qrcodeGen,
    method: 'get',
    data: params,
  })
}
