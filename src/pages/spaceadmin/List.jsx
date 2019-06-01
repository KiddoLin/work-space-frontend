import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { Link } from 'dva/router'
import categories from '../../config/categories';

const confirm = Modal.confirm

const List = ({ onItemStatusChange, isMotion, location, ...tableProps }) => {

  const handleStatusChangeClick = (record) => {
    let opt, s, c;
    if(record.status==0){
        opt = '禁用';
        c = '禁用后，当前用户不能登陆孵化器管理端';
        s = 1;
    }
    else{
        opt = '启用';
        c = '';
        s = 0;
    }
    confirm({
        title: `您确认要 ${opt} 此管理员账号吗？`,
        content: c,
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
    },{
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => <Link to={`/space_admins/${record.id}`}>{text}</Link>,
    },{
      title: '手机号',
      dataIndex: 'telephone',
      key: 'telephone',
    },{
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (t, r) => categories.adminRole[r.role],
    },{
      title: '所属孵化器',
      dataIndex: 'space_name',
      key: 'space_name',
      render: (t, r) => r.space ? r.space.name : r.space_name,
    },{
      title: '打开次数',
      dataIndex: 'active_cnt',
      key: 'active_cnt',
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
          <span className="ant-divider"/>
          <Link to={`/space_admins/${r.id}/edit`}>编辑</Link>
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
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
