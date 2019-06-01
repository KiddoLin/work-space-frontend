import { Select, Spin } from 'antd';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
const Option = Select.Option;

class RemoteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchData = debounce(this.fetchData, 800);
  }
  state = {
    data: [],
    value: [],
    fetching: false,
  }
  fetchData = (value) => {
    console.log('fetching data>>', value);
    const {remoteUrl, handleRemoteData} = this.props;
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ fetching: true });
    const url = remoteUrl(value);
    fetch(url)
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        const data = handleRemoteData(body);
        let fetching = false;
        this.setState({ data ,fetching});
      });
  }
  handleChange = (value) => {
    //console.log('******>>>>');
    const max = this.props.limitSelectOptions;
    value = value.length>max ? value.slice(0, max) : value;
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }
  render() {
    const { fetching, data, value } = this.state;
    const {...otherProps} = this.props;
    return (
      <Select
        mode='multiple'
        value={value}
        notFoundContent={fetching ? <Spin size="small" /> : '找不到记录'}
        filterOption={false}
        onSearch={this.fetchData}
        onChange={this.handleChange}
        {...otherProps}
      >
        {data.map(d => <Option key={d.value}>{d.text}</Option>)}
      </Select>
    );
  }
}

RemoteSelect.propTypes = {
  mode: PropTypes.string,
  notFoundContent: PropTypes.string,
  remoteUrl: PropTypes.func.isRequired,
  handleRemoteData: PropTypes.func.isRequired,
  limitSelectOptions: PropTypes.number
}

RemoteSelect.defaultProps = {
  mode: 'multiple',
  notFoundContent: '找不到记录',
  limitSelectOptions: 2
}

export default RemoteSelect;
