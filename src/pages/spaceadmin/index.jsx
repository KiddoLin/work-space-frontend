import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button } from 'antd'
import List from './List.jsx'
import Filter from './Filter.jsx'

const SpaceAdmins = ({ location, dispatch, spaceAdmin, loading }) => {
  const { list, pagination, item, spaces } = spaceAdmin
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['spaceAdmin/query'],
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
    onItemStatusChange (id, nextStatus) {
      //console.log('id>>', id)
      dispatch({ type: 'spaceAdmin/patch', payload: {id, nextStatus}});
    },
  }

  const filterProps = {
    filter: {
      status: "",
      role: "",
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
      dispatch(routerRedux.push('/space_admins/create'))
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps}/>
      <div style={{ marginBottom: 8, textAlign: 'right'}}>
        <Button type="primary" icon="plus" size={10} onClick={handleCreate}>创建管理员</Button>
      </div>
      <List {...listProps} />
    </div>
  )
}

SpaceAdmins.propTypes = {
  spaceAdmin: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ spaceAdmin, loading }) => ({ spaceAdmin, loading }))(SpaceAdmins)
