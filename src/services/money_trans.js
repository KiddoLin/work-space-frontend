import request from '../utils/request'
import config from '../config/config'
const { api } = config
const { moneyTranses, moneyTransesExportExcel } = api

export async function query (params) {
  return request({
    url: moneyTranses,
    method: 'get',
    data: params,
  })
}

export async function exportExcel (params) {
  return request({
    url: moneyTransesExportExcel,
    method: 'get',
    data: params,
  })
}
