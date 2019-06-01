import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { Link } from 'dva/router'
const confirm = Modal.confirm

const List = ({ isMotion, location, onRemoveItem, ...tableProps }) => {

  const handleRemoveClick = (record) => {
    confirm({
        title: `您确认要删除此记录吗？`,
        onOk () {
          onRemoveItem(record.id);
        },
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },{
      title: '活动主题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <Link to={`/promotions/${record.id}`}>{text}</Link>
    },{
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time'
    },{
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'end_time'
    },{
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at'
    },{
      title: '操作',
      key: 'operation',
      render: (t, r) => {
        return (
        <span>
          <Link to={`/promotions/${r.id}/edit`}>编辑</Link>
          <span className="ant-divider"/>
          <Link onClick={e => handleRemoveClick(r)}>删除</Link>
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
  isMotion: PropTypes.bool,
  location: PropTypes.object,
  onRemoveItem: PropTypes.func,
}

export default List
