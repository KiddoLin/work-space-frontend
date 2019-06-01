import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import { Link } from 'dva/router'
import categories from '../../config/categories';

const confirm = Modal.confirm

const List = ({ onPubSwitchItem, onRemoveItem, isMotion, location, ...tableProps }) => {

  const handlePubSwitchClick = (record) => {
    let opt, s;
    if(record.status==0){
       opt = '上架';
       s = 1;
    }
    else{
      opt = '下架';
      s = 0;
    }
    confirm({
        title: `您确认要 ${opt} 此孵化器信息吗？`,
        onOk () {
          onPubSwitchItem(record.id, s);
        },
    })
  }

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
    }, {
      title: '孵化器名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`/spaces/${record.id}`}>{text}</Link>,
    }, {
      title: '孵化器类型',
      dataIndex: 'category',
      key: 'category',
      render: (t, r) => categories.space[r.category]
    }, {
      title: '行业领域',
      dataIndex: 'industry',
      key: 'industry',
      render: (t, r) => Array.isArray(r.industry) ? r.industry.join(', ') : ''
    },{
      title: '联系电话',
      dataIndex: 'telephone',
      key: 'telephone',
    }, {
      title: '上架时间',
      dataIndex: 'updated_at',
      key: 'updated_at'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (t, r) => r.status===0 ? '已下架' : '已上架'
    }, {
      title: '操作',
      key: 'operation',
      render: (t, r) => {
        return (
        <span>
          <Link onClick={e => handlePubSwitchClick(r)}>{r.status===0? '上架' : '下架'}</Link>
          <span className="ant-divider"/>
          <Link to={`/spaces/${r.id}/edit`} disabled={r.status===1}>编辑</Link>
          <span className="ant-divider"/>
          <Link onClick={e => handleRemoveClick(r)} disabled={r.status===1}>删除</Link>
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
  onPubSwitchItem: PropTypes.func,
  onRemoveItem: PropTypes,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
