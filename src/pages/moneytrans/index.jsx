import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button, message } from 'antd'
import moment from 'moment'
import List from './List.jsx'
import Filter from './Filter.jsx'
import config from '../../config/config'
const { api } = config

const MoneyTranses = ({ location, dispatch, moneyTrans, loading }) => {
  const { list, pagination } = moneyTrans
  const { pageSize } = pagination
  const listProps = {
    dataSource: list,
    loading: loading.effects['moneyTrans/query'],
    pagination,
    location,
    isMotion: false,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    }
  }

  const filterProps = {
    filter: {
      type: '',
      category: '',
      space_name: '',
      ...location.query,
    },
    onFilterChange (criteria) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...criteria,
          page: 1,
          pageSize,
        },
      }))
    }
  }

  const handleExport = () => {
    //dispatch(routerRedux.push('/space_admins/create'))
    //console.log(criteria);
    // let {start, end} = criteria;
    // if(!start || start=='' || !end || end==''){
    //     message.error('请先选择开始日期与结束日期');
    //     return;
    // }
    //dispatch({ type: 'moneyTrans/exportExcel', payload: criteria })
    //console.log(location);
    window.location = api.moneyTransesExportExcel + location.search;
  }
  // console.log(filterProps);
  // console.log('1111111111S');
  // console.log(filterProps.filter);
  // console.log('1111111111E');
  return (
    <div className="content-inner">
      <Filter {...filterProps}/>
      <div style={{ marginBottom: 8, textAlign: 'right'}}>
        <Button type="primary" icon="export" size={10} onClick={handleExport}>导出Excel</Button>
      </div>
      <List {...listProps} />
    </div>
  )
}

MoneyTranses.propTypes = {
  moneyTrans: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ moneyTrans, loading }) => ({ moneyTrans, loading }))(MoneyTranses)
