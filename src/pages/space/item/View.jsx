import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Modal } from 'antd'
import { Link } from 'dva/router'
import PicWall from '../../../components/Picture/PicWall.jsx'
import styles from './View.less'
import categories from '../../../config/categories'

const getNearbyInfo = (mapstat)=>{
  if(!mapstat) return '暂无';

  const {transport, bank, restaurant, hotel} = mapstat;

  return `地铁/公交站(${transport}), 银行/ATM(${bank}), 餐厅(${restaurant}), 酒店(${hotel})`;
}
const View = ({ space, dispatch }) => {
  const { item, qrcode } = space
  const picList = item.pictures || []
  const avatarList = item.mgr_avatar && item.mgr_avatar!=='' ? [{uid: 1, url: item.mgr_avatar}] : []
  const facilities = item.facilities || []
  const {isShow, data} = qrcode

  const onQrcodeClose = ()=>{
      dispatch({
        type: 'space/setQrcodeVisible', payload: {isShow: false}
      })
  }

  const onGenQrcode = ()=>{
      if(!data){
        dispatch({
          type: 'space/genQrcode', payload: {id: item.id, page_type: 0, type: 1}
        })
      }
      else {
        dispatch({
            type: 'space/setQrcodeVisible', payload: {isShow: true}
        })
      }
  }

  return (
    <div className="content-inner">
    <div className={styles.content}>
      <div className={styles.item}>
          <div>孵化器ID</div><div>{item.id}</div>
      </div>
      <div className={styles.item}>
          <div>孵化器名称</div><div>{item.name}</div>
      </div>
       <div className={styles.item}>
          <div>状态</div><div>{item.status===0? '已下架' : '已上架'}</div>
      </div>
      <div className={styles.item}>
          <div>孵化器类型</div><div>{categories.space[item.category]}</div>
      </div>
      <div className={styles.item}>
          <div>行业领域</div><div>{Array.isArray(item.industry) ? item.industry.join(', ') : ''}</div>
      </div>
      <div className={styles.item}>
          <div>孵化器相册</div><div><PicWall readOnly={true} fileList={picList}/></div>
      </div>
      <div className={styles.item}>
          <div>一句话描述</div><div>{item.summary}</div>
      </div>
      <div className={styles.item}>
          <div>标签</div><div>{Array.isArray(item.tags) ? item.tags.join(', ') : ''}</div>
      </div>
      <div className={styles.item}>
          <div>营业时间(工作日)</div><div>{item.operation_time_workday}</div>
      </div>
      <div className={styles.item}>
          <div>营业时间(非工作日)</div><div>{item.operation_time_nonworkday}</div>
      </div>
      <div className={styles.item}>
          <div>联系电话</div><div>{item.telephone}</div>
      </div>
      <div className={styles.item}>
          <div>管家头像</div><div><PicWall readOnly={true} fileList={avatarList}/></div>
      </div>
      <div className={styles.item}>
          <div>省/市/区</div><div>{item.province}/{item.city}/{item.district}</div>
      </div>
      <div className={styles.item}>
          <div>详细地址</div><div>{item.address}</div>
      </div>
      <div className={styles.item}>
          <div>地址经纬度</div><div>{item.longitude},{item.latitude}</div>
      </div>
      <div className={styles.item}>
          <div>所在商圈</div><div>{item.zone}</div>
      </div>
      <div className={styles.item}>
          <div>空间面积</div><div>{item.area_in_sqm}平方米</div>
      </div>
      <div className={styles.item}>
          <div>固定工位数</div><div>{item.num_of_fixed_desk}个</div>
      </div>
      <div className={styles.item}>
          <div>移动工位数</div><div>{item.num_of_nonfixed_desk}个</div>
      </div>
      <div className={styles.item}>
          <div>办公室数</div><div>{item.num_of_office_room}个</div>
      </div>
      <div className={styles.item}>
          <div>会议室数</div><div>{item.num_of_meeting_room}个</div>
      </div>
      <div className={styles.item}>
          <div>活动场地数</div><div>{item.num_of_event_room}个</div>
      </div>
      <div className={styles.item}>
          <div>配套服务</div><div>{facilities.map(val => val.name).join(',')}</div>
      </div>
      <div className={styles.item}>
          <div>孵化器简介</div><div>{item.office_intro}</div>
      </div>
      <div className={styles.item}>
          <div>会议/活动场地简介</div><div>{item.meetingrm_intro}</div>
      </div>
      <div className={styles.item}>
          <div>场地使用说明</div><div>{item.usage}</div>
      </div>
      <div className={styles.item}>
          <div>交通说明</div><div>{item.is_nearby_mtr ? '地铁沿线; ' : ''} {item.traffic_desc}</div>
      </div>
      <div className={styles.item}>
          <div>周边信息</div><div>{getNearbyInfo(item.map_stat)}</div>
      </div>
      { item.status===1 && (
      <div className={styles.item}>
          <div>推广二维码</div><div><Button icon="qrcode" onClick={onGenQrcode}>生成</Button></div>
          <Modal title="推广二维码" visible={isShow} footer={null} onCancel={onQrcodeClose} width={360}>
             <img src={data} alt="二维码" style={{ width: '100%' }}/>
          </Modal>
      </div>
      )}
      <div className={styles.opt}>
          <Button type="primary" icon="left" onClick={e => history.go(-1)}>返回</Button>
          { item.status===0 && (
          <Link to={`/spaces/${item.id}/edit`}><Button className={styles.optEdit} icon="edit">编辑</Button></Link>
          )}
      </div>
    </div>
  </div>)
}

View.propTypes = {
  space: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ space, loading }) => ({ space, loading: loading.models.space }))(View)
