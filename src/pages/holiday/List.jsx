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
      title: '年份',
      dataIndex: 'year',
      key: 'year'
    },{
      title: '节假日',
      dataIndex: 'name',
      key: 'name'
    },{
      title: '休假',
      dataIndex: 'dates',
      key: 'dates',
      render: (t,r) => r.dates ? r.dates.join(',') : ''
    },{
      title: '补班',
      dataIndex: 'dates_onduty',
      key: 'dates_onduty',
      render: (t,r) => r.dates_onduty ? r.dates_onduty.join(',') : ''
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
          <Link to={`/holidays/${r.id}/edit`}>编辑</Link>
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
