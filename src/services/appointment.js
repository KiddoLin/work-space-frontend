import request from '../utils/request'
import config from '../config/config'
const { api } = config
const { appointments, appointment } = api

export async function query (params) {
  return request({
    url: appointments,
    method: 'get',
    data: params,
  })
}

export async function get (params) {
  return request({
    url: appointment,
    method: 'get',
    data: params,
  })
}
