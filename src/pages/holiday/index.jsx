import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button, message } from 'antd'
import moment from 'moment'
import List from './List.jsx'
import Filter from './Filter.jsx'

const Holidays = ({ location, dispatch, holiday, loading }) => {
  const { list, pagination } = holiday
  const { pageSize } = pagination
  const listProps = {
    dataSource: list,
    loading: loading.effects['holiday/query'],
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
      dispatch({ type: 'holiday/remove', payload: {id}});
    }
  }

  const filterProps = {
    filter: {
      year: '', //new Date().getFullYear().toString(),
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
      dispatch(routerRedux.push('/holidays/create'))
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps}/>
      <div style={{ marginBottom: 8, textAlign: 'right'}}>
        <Button type="primary" icon="plus" size={10} onClick={handleCreate}>创建节假日</Button>
      </div>
      <List {...listProps} />
    </div>
  )
}

Holidays.propTypes = {
  holiday: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ holiday, loading }) => ({ holiday, loading }))(Holidays)
