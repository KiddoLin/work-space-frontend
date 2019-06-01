import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../../components/DataTable/AnimTableBody'
import { Link } from 'dva/router'
import categories from '../../../config/categories';
import statuses from '../../../config/statuses';

const List = ({ onPubSwitchItem, isMotion, location, ...tableProps }) => {

  const columns = [{
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },{
      title: '订单编号',
      dataIndex: 'order_no',
      key: 'order_no',
      render: (t, r) => {
        return (
        <span>
          <Link to={`/orders/office/${r.id}`}>{r.order_no}</Link>
        </span>);
      }
    },{
      title: '所属孵化器',
      dataIndex: 'space_name',
      key: 'space_name'
    }, {
      title: '场地名称',
      dataIndex: 'booking_name',
      key: 'booking_name',
    },{
      title: '总金额(元)',
      dataIndex: 'payment_amount',
      key: 'payment_amount',
    },{
      title: '联系人',
      dataIndex: 'contact_name',
      key: 'contact_name',
    },{
      title: '联系电话',
      dataIndex: 'contact_phone',
      key: 'contact_phone',
    },{
      title: '开始使用',
      dataIndex: 'from_date',
      key: 'from_date'
    },{
      title: '结束使用',
      dataIndex: 'to_date',
      key: 'to_date'
    },{
      title: '订单来源',
      dataIndex: 'source',
      key: 'source',
      render: (t,r) => categories.orderSource[r.source]
    },{
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (t, r) => {
        let status = statuses.order.find(st => st.val==r.status);
        return status ? status.text : '未知状态';
      }
    }
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }
  //console.log('+++>>', tableProps)
  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
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
