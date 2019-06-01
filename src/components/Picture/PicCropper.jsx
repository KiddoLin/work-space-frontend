import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal, message } from 'antd';
import styles from './PicCropper.less';
import CropperJS from 'react-cropperjs';
import axios from 'axios';

function convertBase64ToBlob(urlData){
    var bytes=window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob( [ab] , {type : 'image/png'});
}

class PicCropper extends React.Component{
  constructor(props, context) {
    super(props);
    this.state = {
      previewVisible: false,
      previewPicUrl: '',
      cropperVisible: false,
      cropperPicUrl: '',
      picUrl: props.picUrl
    }
  }

  onPreviewCancel = () => this.setState({ previewVisible: false})

  onPreview = (file) => {
    this.setState({
      previewPicUrl: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  onRemove = (file) => {
    this.setValue(null);
    return true;
  }

  beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (evt) =>{
        this.setState({cropperPicUrl: evt.target.result, cropperVisible: true});
    }
    reader.readAsDataURL(file);
    return false;
  }
  onCrop = () =>{
    //console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }
  setValue = (url)=>{
    this.setState({picUrl: url, cropperVisible: false, cropperPicUrl: null});
    this.triggerChange(url);
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }
  onCropperOk = () =>{
    let {url, data, getPicUrl} = this.props;
    const base64Img = this.refs.cropper.getCroppedCanvas().toDataURL();
    let form = new FormData();
    form.append('token', data.token);
    form.append('file', convertBase64ToBlob(base64Img));
    let config = {
      headers:{'Content-Type':'multipart/form-data'}
    };
    axios.post(url, form, config)
        .then(res=>{
          console.log(res.data);
          let url = getPicUrl(res.data, res);
          this.setValue(url);
        })
        .catch((e) =>{
          message.error('上传失败,刷新稍后再试');
        });
  }
  onCropperCancel = ()=>{
    this.setState({cropperVisible: false});
  }
  render(){
    const { maximum , readOnly, ...otherProps} = this.props;
    const { previewVisible, previewPicUrl, cropperVisible, cropperPicUrl, picUrl } = this.state;
    const uploadButton = !readOnly && !picUrl ? (<div><Icon type="plus"/></div>) : null;
    const fileList = picUrl ? [{uid: 0, url: picUrl}] : [];
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          className={styles.picCard}
          multiple={false}
          showUploadList={{showPreviewIcon: true, showRemoveIcon: !readOnly}}
          fileList={fileList}
          onPreview={this.onPreview}
          onRemove={this.onRemove}
          beforeUpload={this.beforeUpload}
          {...otherProps}>
          { uploadButton }
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.onPreviewCancel}>
          <img alt="" style={{ width: '100%' }} src={previewPicUrl}/>
        </Modal>
        <Modal visible={cropperVisible} closable={false} style={{ top: 20}}
               onOk={this.onCropperOk} onCancel={this.onCropperCancel}>
          <CropperJS ref="cropper" src={cropperPicUrl}
                     style={{height: '100%', width: '100%'}}
                     aspectRatio={1}
                     viewMode={1}
                     dragMode="move"
                     guides={true}
                     //cropBoxResizable={false}
                     minCropBoxWidth={128}
                     crop={this.onCrop}/>
        </Modal>
      </div>
    );
  }
}
PicCropper.propTypes = {
  readOnly: PropTypes.bool,
  picUrl: PropTypes.string,
  getPicUrl: PropTypes.func.isRequired
}

PicCropper.defaultProps = {
  readOnly: false
}

export default PicCropper
