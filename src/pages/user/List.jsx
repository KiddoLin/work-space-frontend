import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { Link } from 'dva/router'
import categories from '../../config/categories';

const confirm = Modal.confirm

const List = ({ onItemBind, onItemUnbind, onItemStatusChange, isMotion, location, ...tableProps }) => {

  const handleTypeChangeClick = (record) => {
      if(record.type==1){
        confirm({
          title: `您确认要 解绑 此用户账号吗？`,
          onOk () {
            onItemUnbind(record);
          },
        })
      }
      else{
        onItemBind(record);
      }
  }

  const handleStatusChangeClick = (record) => {
    let opt, s;
    if(record.status==0){
       opt = '禁用';
       s = 1;
    }
    else{
      opt = '启用';
      s = 0;
    }
    confirm({
        title: `您确认要 ${opt} 此用户账号吗？`,
        content: '禁用后，当前用户不能在平台进行交易',
        onOk () {
          onItemStatusChange(record.id, s);
        },
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '用户名称',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => <Link to={`/users/${record.id}`}>{text}</Link>,
    }, {
      title: '手机号码',
      dataIndex: 'telephone',
      key: 'telephone',
    }, {
      title: '用户类型',
      dataIndex: 'type',
      key: 'type',
      render: (t, r) => r.type===1 ? '孵化器用户' : '普通用户'
    }, {
      title: '入驻孵化器',
      dataIndex: 'space_name',
      key: 'space_name',
      render: (t, r) => r.space ? r.space.name : r.space_name,
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (t, r) => r.status===0 ? '正常' : '已禁用'
    }, {
      title: '操作',
      key: 'operation',
      render: (t, r) => {
        return (
        <span>
          <Link onClick={e => handleStatusChangeClick(r)}>{r.status===0? '禁用' : '启用'}</Link>
          <span className="ant-divider" />
          <Link onClick={e => handleTypeChangeClick(r)}>{r.type===0? '绑定' : '解绑'}</Link>
        </span>);
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = body => { return true ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: true })}
        bordered
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onItemStatusChange: PropTypes.func,
  onItemBind: PropTypes.func,
  onItemUnbind: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
