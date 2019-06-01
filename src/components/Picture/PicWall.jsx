import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal } from 'antd';
import styles from './PicWall.less';

//const confirm = Modal.confirm;
class PicWall extends React.Component{
  state = {
      previewVisible: false,
      previewImage: ''
  }


  handleCancel = () => this.setState({ previewVisible: false})

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  render() {
    const { maximum , readOnly, fileList, ...otherProps} = this.props;
    const { previewVisible, previewImage } = this.state;
    const uploadButton = !readOnly && fileList.length < maximum ? (<div><Icon type="plus"/></div>) : null;
    //console.log(fileList);
    //console.log(otherProps);
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          className={styles.picCard}
          multiple={false}
          showUploadList={{showPreviewIcon: true, showRemoveIcon: !readOnly}}
          fileList={fileList}
          onPreview={this.handlePreview}
          {...otherProps}>
          { uploadButton }
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

PicWall.propTypes = {
  maximum: PropTypes.number,
  readOnly: PropTypes.bool,
  fileList: PropTypes.arrayOf(PropTypes.object)
}

PicWall.defaultProps = {
  maximum: 4,
  readOnly: false
}

export default PicWall
