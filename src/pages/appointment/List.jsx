import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { Link } from 'dva/router'
import categories from '../../config/categories';

//const confirm = Modal.confirm

const List = ({ isMotion, location, ...tableProps }) => {

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },{
      title: '参观孵化器',
      dataIndex: 'space_name',
      key: 'space_name'
    },{
      title: '预约日期',
      dataIndex: 'appoint_time',
      key: 'appoint_time'
    },{
      title: '联系人',
      dataIndex: 'contact_name',
      key: 'contact_name'
    },{
      title: '联系电话',
      dataIndex: 'contact_phone',
      key: 'contact_phone'
    },{
      title: '参观目的',
      dataIndex: 'purpose',
      key: 'purpose',
      render: (t, r) => categories.aptmPurposes[r.purpose],
    },{
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at'
    }
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
}

export default List
