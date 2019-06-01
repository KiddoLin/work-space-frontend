import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button,Modal } from 'antd'
import { Link } from 'dva/router'
import PicWall from '../../../components/Picture/PicWall.jsx'
import styles from './View.less'
import categories from '../../../config/categories'

const getRentModelToText = (val) => {
  switch(val){
    case 0: return '日租';
    case 1: return '月租';
    case 2: return '日租+月租';
    default: return '未定义';
  }
}

const View = ({ office, dispatch }) => {
  const { item, qrcode } = office
  const { space } = item
  let {picture, rent_model, is_weekend_excluded, is_holiday_excluded} = item
  //const { picture } = item
  const picList = picture || [];//picture && picture=='' ? [] : [{url: item.picture, uid:1}]
  //const facilityNames = item.facilities.map((val))
  let region = '';
  if(space && space.province) region = space.province;
  if(space && space.city) region += '/' + space.city;
  if(space && space.district && space.district!=='') region += '/' + space.district;

  rent_model = item.rent_model || 0;
  let excludedModel = '';
  if(is_weekend_excluded===1) excludedModel+='周末';
  if(is_holiday_excluded===1) excludedModel+=', 法定假日';

  const {isShow, data} = qrcode

  const onQrcodeClose = ()=>{
      dispatch({
        type: 'office/setQrcodeVisible', payload: {isShow: false}
      })
  }

  const onGenQrcode = ()=>{
      if(!data){
        dispatch({
          type: 'office/genQrcode', payload: {id: item.id, page_type: 1, type: 1}
        })
      }
      else {
        dispatch({
            type: 'office/setQrcodeVisible', payload: {isShow: true}
        })
      }
  }

  return (
    <div className="content-inner">
    <div className={styles.content}>
      <div className={styles.item}>
          <div>场地ID</div><div>{item.id}</div>
      </div>
      <div className={styles.item}>
          <div>场地名称</div><div>{item.name}</div>
      </div>
       <div className={styles.item}>
          <div>状态</div><div>{item.status===0? '已下架' : '已上架'}</div>
      </div>
      <div className={styles.item}>
          <div>类型</div><div>{categories.office[item.category]}</div>
      </div>
      <div className={styles.item}>
          <div>所属孵化器</div><div><Link to={`/spaces/${item.space_id}`}>{space ? space.name : ''}</Link></div>
      </div>
      <div className={styles.item}>
          <div>所在地区</div><div>{region}</div>
      </div>
      <div className={styles.item}>
          <div>标签</div><div>{Array.isArray(item.tags) ? item.tags.join(', ') : ''}</div>
      </div>
      <div className={styles.item}>
          <div>场地相册</div><div><PicWall readOnly={true} fileList={picList}/></div>
      </div>
      <div className={styles.item}>
          <div>租赁模式</div><div>{getRentModelToText(rent_model)}</div>
      </div>
      {(rent_model===0 || rent_model===2) && (
      <div className={styles.item}>
          <div>价格(元/天)</div><div>¥{item.price_per_day}, 最少{item.min_rent_days || 1}天起租</div>
      </div>
      )}
      {(rent_model===1 || rent_model===2) && (
      <div className={styles.item}>
          <div>价格(元/月)</div><div>¥{item.price_per_month}, 最少{item.min_rent_months || 1}月起租</div>
      </div>
      )}
      <div className={styles.item}>
          <div>库存数量</div><div>{item.num_of_unit}</div>
      </div>
      <div className={styles.item}>
          <div>节假日不可预定</div><div>{excludedModel}</div>
      </div>
      <div className={styles.item}>
          <div>指定不可预定日期</div><div>{item.dates_excluded ? item.dates_excluded.join(',') : ''}</div>
      </div>
      <div className={styles.item}>
          <div>创建时间</div><div>{item.created_at}</div>
      </div>
      <div className={styles.item}>
          <div>上架时间</div><div>{item.updated_at}</div>
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
          <Link to={`/offices/${item.id}/edit`}><Button className={styles.optEdit} icon="edit">编辑</Button></Link>
          )}
      </div>
    </div>
  </div>)
}

View.propTypes = {
  office: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ office, loading }) => ({ office, loading: loading.models.office }))(View)
