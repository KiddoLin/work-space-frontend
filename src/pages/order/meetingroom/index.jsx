import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button } from 'antd'
import List from './List.jsx'
import Filter from './Filter.jsx'

const Orders = ({ location, dispatch, meetingroomOrder, loading }) => {
  const { list, pagination } = meetingroomOrder
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['meetingroomOrder/query'],
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
  meetingroomOrder: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ meetingroomOrder, loading }) => ({ meetingroomOrder, loading }))(Orders)
