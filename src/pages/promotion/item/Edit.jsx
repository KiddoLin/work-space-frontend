import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import moment from 'moment'
import { Form, Spin, Input, Select, Row, Col, Button, DatePicker, Tabs, message} from 'antd'
import EditableDetails from '../../../components/Promotion/EditableDetails.jsx';
import styles from './Edit.less'
import categories from '../../../config/categories'


const FormItem = Form.Item
const Option = Select.Option
const InputGroup = Input.Group
const RangePicker = DatePicker.RangePicker
const TabPane = Tabs.TabPane

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
}

const showTimeCfg = {
    hideDisabledOptions: true,
    defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')]
}

const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
}

const disabledDate = (current) => {
    // Can not select days before today
    return current && current.diff(moment(), 'days')<0 ;
}

// const disabledRangeTime = (_, type) => {
//     if (type === 'start') {
//       return {
//         disabledHours: () => range(0, 60).splice(4, 20),
//         disabledMinutes: () => range(30, 60),
//         disabledSeconds: () => [55, 56],
//       };
//     }
//     return {
//         disabledHours: () => range(0, 60).splice(20, 4),
//         disabledMinutes: () => range(0, 31),
//         disabledSeconds: () => [55, 56],
//     };
// }

// const Edit = ({ promotion,   dispatch, loading, form: { getFieldDecorator, getFieldValue, getFieldsValue, setFieldsValue, validateFields, validateFieldsAndScroll }}) => {
//   const { isNew, item } = promotion
//   const {id, title, start_time, end_time} = item;
//   const timeRange = []
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     validateFieldsAndScroll((err, values) => {
//       if (!err) {
//           //values.dates= datesRef.getValue() || [];
//           //values.dates_onduty= datesOndutyRef.getValue() || [];
//           //values.year = parseInt(values.year);
//           //console.log(values);
//           //values.name = categories.cnHolidays[values.idx];
//           if(id && !isNew){
//             dispatch({ type: 'promotion/update', payload: {id, ...values}});
//           }
//           else{
//             dispatch({ type: 'promotion/create', payload: values});
//           }
//       }
//     });
//   }

//   const range = (start, end) => {
//       const result = [];
//       for (let i = start; i < end; i++) {
//         result.push(i);
//       }
//       return result;
//   }

//   const disabledDate = (current) => {
//       // Can not select days before today and today
//       return current && current.valueOf() < Date.now();
//   }

//   const disabledRangeTime = (_, type) => {
//       if (type === 'start') {
//         return {
//           disabledHours: () => range(0, 60).splice(4, 20),
//           disabledMinutes: () => range(30, 60),
//           disabledSeconds: () => [55, 56],
//         };
//       }
//       return {
//           disabledHours: () => range(0, 60).splice(20, 4),
//           disabledMinutes: () => range(0, 31),
//           disabledSeconds: () => [55, 56],
//       };
//   }

//   return (
//     <div className="content-inner">
//       <Spin size="large" spinning={loading}>
//       <Form>
//         <FormItem {...formItemLayout} label="活动标题" hasFeedback>
//           {getFieldDecorator('title', { initialValue: title,
//             rules: [{
//               required: true, message: '必输项不能为空!',
//             }]
//           })(
//             <Input maxLength={12}/>
//           )}
//         </FormItem>
//         <FormItem {...formItemLayout} label="活动时间" hasFeedback>
//           {getFieldDecorator('timeRange',  { initialValue: timeRange,
//               rules: [{ required: true, message: '必输项不能为空!' }]
//           })(
//           <RangePicker disabledDate={disabledDate} disabledTime={disabledRangeTime}
//                        showTime={showTimeCfg} format="YYYY-MM-DD HH:mm:ss"
//                        style={{ width: '100%' }}/>
//           )}
//         </FormItem>
//         <FormItem wrapperCol={{ span: 12, offset: 6 }}>
//           <Button type="primary" icon="save" htmlType="submit" onClick={handleSubmit}>保存&下一步</Button>
//           <Button className={styles.optBtn} icon="left" onClick={e => history.go(-1)}>返回</Button>
//         </FormItem>
//       </Form>
//       </Spin>
//     </div>
//   )
// }

// Edit.propTypes = {
//   promotion: PropTypes.object,
//   form: PropTypes.object,
//   loading: PropTypes.bool,
// }

// export default connect(({ promotion, loading }) => ({ promotion, loading: loading.models.promotion }))(Form.create()(Edit))
const TIME_FMT = 'YYYY-MM-DD HH:mm:ss';

class Edit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {activeTab: 'base'};
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onSpaceChanged = this.onSpaceChanged.bind(this);
      this.onTabChange= this.onTabChange.bind(this);
      this.onDetailDelete = this.onDetailDelete.bind(this);
      this.onDetailAdd = this.onDetailAdd.bind(this);
    }
    handleSubmit(e) {
      let {promotion, dispatch, form: {validateFieldsAndScroll}} = this.props;
      const { isNew, item } = promotion;
      const id = item.id;
      e.preventDefault();

      validateFieldsAndScroll((err, values) => {
          if(err){
            this.setState({activeTab: 'base'});
            return;
          }

          const details = isNew ? (this.refs.details ? this.refs.details.getValues() : []) : item.details;
          if(details.length===0){
            this.setState({activeTab: 'details'});
            message.error('场地信息为空, 请新增促销活动场地');
            return;
          }

          const timeRange = values.timeRange;
          values['start_time'] = timeRange[0].format(TIME_FMT);
          values['end_time'] = timeRange[1].format(TIME_FMT);
          delete values['timeRange'];

          values['details'] = details;

          //console.log(values);

          if(id && !isNew){
            dispatch({ type: 'promotion/update', payload: {id, ...values}});
          }
          else {
            dispatch({ type: 'promotion/create', payload: values});
          }
      });
    }
    onSpaceChanged(space_json) {
      const space = JSON.parse(space_json);
      this.props.dispatch({type: 'promotion/getOmrs', payload:{id: space.id}});
    }
    onTabChange(key) {
      this.setState({activeTab: key});
    }
    onDetailDelete(detail){
      const {id, promotion_id} = detail;
      this.props.dispatch({type: 'promotion/removeDetail', payload:{id: promotion_id, did: id}});
    }
    onDetailAdd(detail){
      const item = this.props.promotion.item;
      const {id} = item;
      detail.promotion_id = id;
      this.props.dispatch({type: 'promotion/addDetail', payload:{id: id, detail}});
    }
    render(){
        const {loading, promotion, form: {getFieldDecorator}} = this.props;
        const { isNew, item, spaces, omrs } = promotion;
        const {id, title, start_time, end_time, details} = item;
        const timeRange = isNew ? [] : [moment(start_time), moment(end_time)];
        let onDetailDelete = isNew ? null : this.onDetailDelete;
        let onDetailAdd = isNew ? null : this.onDetailAdd;

        return (
        <div className="content-inner">
          <Spin size="large" spinning={loading}>
          <Tabs activeKey={this.state.activeTab} onChange={this.onTabChange}>
          <TabPane tab="基本信息" key="base">
          <Form>
            <FormItem {...formItemLayout} label="活动主题" hasFeedback>
              {getFieldDecorator('title', { initialValue: title,
                rules: [{
                  required: true, message: '必输项不能为空!',
                }]
              })(
                <Input maxLength={12}/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="活动时间" hasFeedback>
              {getFieldDecorator('timeRange',  { initialValue: timeRange,
                  rules: [{ required: true, message: '必输项不能为空!' }]
              })(
              <RangePicker disabledDate={disabledDate}
                           showTime={showTimeCfg} format={TIME_FMT}
                           placeholder={['开始时间','结束时间']} style={{ width: '100%' }}/>
              )}
            </FormItem>
          </Form>
          </TabPane>
          <TabPane tab="场地信息" key="details">
              <EditableDetails ref="details" isNew={isNew} spaces={spaces}
                               omrs={omrs} values={details || []}
                               onSpaceChanged={this.onSpaceChanged}
                               onDetailDelete={onDetailDelete}
                               onDetailAdd={onDetailAdd}/>
          </TabPane>
          </Tabs>
          <Row gutter={8}>
              <Col span={8}/>
              <Col span={8}>
              <Button type="primary" icon="save" htmlType="submit" onClick={this.handleSubmit}>保存</Button>
              <Button className={styles.optBtn} icon="left" onClick={e => history.go(-1)}>返回</Button>
              </Col>
              <Col span={8}/>
          </Row>
          </Spin>
        </div>
        );
    }
}
Edit.propTypes = {
  promotion: PropTypes.object,
  form: PropTypes.object,
  loading: PropTypes.bool,
}
export default connect(({ promotion, loading }) => ({ promotion, loading: loading.models.promotion }))(Form.create()(Edit))
