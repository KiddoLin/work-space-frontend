import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button, message } from 'antd'
import moment from 'moment'
import List from './List.jsx'
import Filter from './Filter.jsx'

const Promotions = ({ location, dispatch, promotion, loading }) => {
  const { list, pagination } = promotion
  const { pageSize } = pagination
  const listProps = {
    dataSource: list,
    loading: loading.effects['promotion/query'],
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
    },
    onRemoveItem (id) {
      dispatch({ type: 'promotion/remove', payload: {id}});
    }
  }

  const filterProps = {
    filter: {
      status: '',
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

  const handleCreate = () => {
      dispatch(routerRedux.push('/promotions/create'))
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps}/>
      <div style={{ marginBottom: 8, textAlign: 'right'}}>
        <Button type="primary" icon="plus" size={10} onClick={handleCreate}>创建促销活动</Button>
      </div>
      <List {...listProps} />
    </div>
  )
}

Promotions.propTypes = {
  promotion: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ promotion, loading }) => ({ promotion, loading }))(Promotions)
