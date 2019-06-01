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
        title: `您确认要 ${opt} 此场地信息吗？`,
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

  const getRegion = (r) => {
    let space = r.space;
    let region = '';
    if(space && space.province) region += space.province;
    if(space && space.city) region += '/' + space.city;
    if(space && space.district) region += '/' + space.district;
    return region;
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },{
      title: '场地名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`/meetingrooms/${record.id}`}>{text}</Link>,
    },{
      title: '场地类型',
      dataIndex: 'category',
      key: 'category',
      render: (t, r) => categories.meetingroom[r.category]
    },{
      title: '所在地区',
      dataIndex: 'region',
      key: 'region',
      render: (t, r) => getRegion(r)
    },{
      title: '所属孵化器',
      dataIndex: 'space_name',
      key: 'space_name',
      render: (t, r) => r.space ? r.space.name : r.space_name,
    },{
      title: '价格(元/小时)',
      dataIndex: 'price_per_hour',
      key: 'price_per_hour',
    },{
      title: '容纳人数',
      dataIndex: 'capacity',
      key: 'capacity',
    },{
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
          <Link to={`/meetingrooms/${r.id}/edit`} disabled={r.status===1}>编辑</Link>
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
  onRemoveItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
