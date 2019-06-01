import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button,Icon,Table } from 'antd'
import { Link } from 'dva/router'
import styles from './View.less'
import categories from '../../../config/categories'

const getOmrUrl = (r) =>{
  if(r.type===1)
     return '/offices/' + r.office_id;
  else if(r.type===2)
     return '/meetingrooms/' + r.meetingroom_id;
  else
     return '#';
}

const View = ({ promotion }) => {
  const { item } = promotion
  const columns = [{
      title: '孵化器',
      dataIndex: 'space_name',
      width: '24%',
      render: (t, r) => {
        return <Link to={`/spaces/${r.space_id}`}>{r.space_name}</Link>
      }
    },{
      title: '场地名称',
      dataIndex: 'booking_name',
      width: '24%',
      render: (t, r) => {
        return <Link to={getOmrUrl(r)}>{r.booking_name}</Link>
      }
    },{
      title: '类型',
      dataIndex: 'category',
      width: '10%',
      render: (t, r) => r.type===1 ? categories.office[r.category] : categories.meetingroom[r.category]
    },{
      title: '价格',
      dataIndex: 'price',
      width: '12%',
      render: (t, r) => {
          switch(r.unit_of_time){
            case 'H': return r.price + '元/小时';
            case 'D': return r.price + '元/天';
            case 'M': return r.price + '元/月';
            default: return r.price + '元';
          }
      }
    },{
      title: '使用说明',
      dataIndex: 'remark',
      width: '30%'
    }]

  return (
    <div className="content-inner">
    <div className={styles.content}>
      <div className={styles.item}>
          <div>促销活动ID</div><div>{item.id}</div>
      </div>
      <div className={styles.item}>
          <div>活动主题</div><div>{item.title}</div>
      </div>
      <div className={styles.item}>
          <div>开始时间</div><div>{item.start_time}</div>
      </div>
      <div className={styles.item}>
          <div>结束时间</div><div>{item.end_time}</div>
      </div>
      <div className={styles.item}>
          <div>创建时间</div><div>{item.created_at}</div>
      </div>
      <div className={styles.item}>
          <div>场地信息</div><div></div>
      </div>
      <Table bordered dataSource={item.details} columns={columns} pagination={false}/>
      <div className={styles.opt}>
          <Button type="primary" icon="left" onClick={e => history.go(-1)}>返回</Button>
          <Link to={`/promotions/${item.id}/edit`}><Button className={styles.optEdit} icon="edit">编辑</Button></Link>
      </div>
    </div>
  </div>)
}

View.propTypes = {
  promotion: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ promotion, loading }) => ({ promotion, loading: loading.models.promotion }))(View)
