import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button } from 'antd'
import List from './List.jsx'
import Filter from './Filter.jsx'

const Offices = ({ location, dispatch, office, loading }) => {
  const { list, pagination } = office
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['office/query'],
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
      dispatch({ type: 'office/pubOrUnpub', payload: {id, nextStatus}});
    },
    onRemoveItem (id) {
      dispatch({ type: 'office/remove', payload: {id}});
    }
  }

  const filterProps = {
    filter: {
      status: "",
      category: "",
      rent_model: "0,2",
      ...location.query,
    },
    onFilterChange (criteria) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...criteria,
          page: 1,
          pageSize
        },
      }))
    }
  }

  const handleCreate = () => {
      dispatch(routerRedux.push('/offices/create'))
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

Offices.propTypes = {
  office: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ office, loading }) => ({ office, loading }))(Offices)
