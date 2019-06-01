import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { Link } from 'dva/router'
import categories from '../../config/categories';

const confirm = Modal.confirm

const List = ({ isMotion, location, ...tableProps }) => {

  const getCategory = (r) => {
    if(!r.order) return '';
    if(r.order.order_type===1){
      return categories.office[r.order.category];
    }
    else if(r.order.order_type===2){
      return categories.meetingroom[r.order.category];
    }
    return '';
  }

  const getOrderPath = (r) => {
    let {order} = r;
    if(order.order_type===1){
      return '/orders/office/' + order.id;
    }
    else if(order.order_type===2){
      return '/orders/meetingroom/' + order.id;
    }
    return '#';
  }

  const renderAmount = (r) => {
    if(r.type===0)
      return <span className={styles.incomeCell}>{r.amount}</span>;
    else if(r.type===1)
      return <span className={styles.outcomeCell}>-{r.amount}</span>;
    else
      return r.amount;
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },{
      title: '订单编号',
      dataIndex: 'order_no',
      key: 'order_no',
      render: (t, r) => <Link to={getOrderPath(r)}>{t}</Link>,
    },{
      title: '所属孵化器',
      dataIndex: 'space_name',
      key: 'space_name',
      render: (t, r) => r.order.space_name,
    },{
      title: '场地类型',
      dataIndex: 'space_category',
      key: 'space_category',
      render: (t, r) => getCategory(r),
    },{
      title: '交易类型',
      dataIndex: 'type',
      key: 'type',
      render: (t, r) => categories.transType[r.type],
    },{
      title: '交易金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (t, r) => renderAmount(r),
    },{
      title: '支付方式',
      dataIndex: 'payment_type',
      key: 'payment_type',
      render: (t, r) => categories.paymentType[r.payment_type],
    },{
      title: '交易时间',
      dataIndex: 'created_at',
      key: 'created_at'
    },{
      title: '交易流水',
      dataIndex: 'transaction_id',
      key: 'transaction_id'
    },{
      title: '订单联系人',
      dataIndex: 'contact_name',
      key: 'contact_name',
      render: (t, r) => r.order ? r.order.contact_name : '',
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
