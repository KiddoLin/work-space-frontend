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
    },{
      title: '申请孵化器',
      dataIndex: 'space_name',
      key: 'space_name'
    }, {
      title: '场地名称',
      dataIndex: 'booking_name',
      key: 'booking_name',
    },{
      title: '场地类型',
      dataIndex: 'category',
      key: 'category',
      render: (t, r) => r.type===1 ? categories.office[r.category] : categories.meetingroom[r.category]
    },{
      title: '联系人',
      dataIndex: 'contact_name',
      key: 'contact_name',
    },{
      title: '联系电话',
      dataIndex: 'contact_phone',
      key: 'contact_phone',
    },/*{
      title: '使用时间',
      dataIndex: 'use_date',
      key: 'use_date'
    },*/{
      title: '申请时间',
      dataIndex: 'created_at',
      key: 'created_at'
    },{
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (t, r) => {
         switch(r.status){
            case 0: return '待处理';
            case 1: return '已处理(申请成功)';
            case 2: return '已处理(申请失败)';
            default: return '未知状态';
         }
      }
    },{
      title: '操作',
      key: 'opt',
      render: (t, r) => <Link to={`/orders/promotion/${r.id}`}>详情</Link>
    }
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

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
