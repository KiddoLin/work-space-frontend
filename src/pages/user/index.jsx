import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button } from 'antd'
import List from './List.jsx'
import Filter from './Filter.jsx'
import Modal from './Modal.jsx'

const Users = ({ location, dispatch, user, loading }) => {
  const { list, pagination, item, modalVisible, spaces } = user
  const { pageSize } = pagination

  const listProps = {
    dataSource: list,
    loading: loading.effects['user/query'],
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
      dispatch({ type: 'user/patch', payload: {id, nextStatus}});

    },
    onItemUnbind (item) {
      let {id, type, space_id} = item;
      type = 0; space_id = 0;
      dispatch({ type: 'user/patch', payload: {id, type, space_id}});
    },
    onItemBind (item) {
      //console.log(item);
      dispatch({ type: 'user/showModal', payload: {item}});
    },
  }

  const filterProps = {
    filter: {
      status: "",
      type: "",
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

  const modalProps = {
    item: item,
    spaces: spaces,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/query'],
    title: '用户绑定',
    wrapClassName: 'vertical-center-modal',
    onSpaceBind (data) {
      dispatch({ type: 'user/patch', payload: data})
    },
    onCancel () {
      dispatch({
        type: 'user/hideModal',
      })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps}/>
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Users.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ user, loading }) => ({ user, loading }))(Users)
