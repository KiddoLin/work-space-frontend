import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button } from 'antd'
import List from './List.jsx'
import Filter from './Filter.jsx'

const Meetingrooms = ({ location, dispatch, meetingroom, loading }) => {
  const { list, pagination } = meetingroom
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['meetingroom/query'],
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
    onPubSwitchItem (id, nextStatus) {
      //console.log('id>>', id)
      dispatch({ type: 'meetingroom/pubOrUnpub', payload: {id, nextStatus}});
    },
    onRemoveItem (id) {
      dispatch({ type: 'meetingroom/remove', payload: {id}});
    }
  }

  const filterProps = {
    filter: {
      status: "",
      category: "",
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
      dispatch(routerRedux.push('/meetingrooms/create'))
  }
  return (
    <div className="content-inner">
      <Filter {...filterProps}/>
      <div style={{ marginBottom: 8, textAlign: 'right'}}>
      <Button type="primary" icon="plus" size={10} onClick={handleCreate}>创建场地</Button>
      </div>
      <List {...listProps} />
    </div>
  )
}

Meetingrooms.propTypes = {
  meetingroom: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ meetingroom, loading }) => ({ meetingroom, loading }))(Meetingrooms)
