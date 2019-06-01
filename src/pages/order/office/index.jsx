import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button } from 'antd'
import List from './List.jsx'
import Filter from './Filter.jsx'

const Orders = ({ location, dispatch, officeOrder, loading }) => {
  const { list, pagination } = officeOrder
  const { pageSize } = pagination
  //console.log('>>>>>>>>>', list)
  const listProps = {
    dataSource: list,
    loading: loading.effects['officeOrder/query'],
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
      status: "",
      category: "",
      source: "",
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

  return (
    <div className="content-inner">
      <Filter {...filterProps}/>
      <List {...listProps} />
    </div>
  )
}

Orders.propTypes = {
  officeOrder: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ officeOrder, loading }) => ({ officeOrder, loading }))(Orders)
