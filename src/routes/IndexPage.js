import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, DatePicker, Modal } from 'antd';
import { formatDate } from '../utils/common'
import styles from './IndexPage.css';

const formItemLayout = {
  labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
  },
  wrapperCol: {
      xs: { span: 24 },
      sm: { span: 10 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
      xs: {
          span: 24,
          offset: 0,
      },
      sm: {
          span: 16,
          offset: 8,
      },
  },
};

const FormItem = Form.Item;
const Option = Select.Option;



function IndexPage(props) {
  const { form, indexRecord, dispatch } = props;
  const { data } = indexRecord;
  const { getFieldDecorator, validateFieldsAndScroll } = form;

  const _renderContent = function (type) {
    switch(type) {
      case 'date':
        return (
          <DatePicker className={styles.datepicker} />
        )
      case 'number':
        return (
          <Input />
        )
      case 'text':
        return (
          <Input />
        )
    }
  }

  const _validatorFn = (arr, rule, value, callback) => {
    if (arr[0] === 'number') {
      if (value && /^[0-9]*$/.test(value)) {
        callback()
      } else {
        callback('The input must be a number!')
      }
    }
    if (arr[1] && arr[1] < value) {
      callback(`The input must be less than ${arr[0] === 'date' ? formatDate(arr[1]) : arr[1]}!`)
    } else {
      callback()
    }
    if (arr[2] && arr[2] > value) {
      callback(`The input must be more than ${arr[0] === 'date' ? formatDate(arr[2]) : arr[2]}!`)
    } else {
      callback()
    }
  }

  const _renderHtml = function(arg) {
    const { data = {} } = arg;

    const htmlArr = data.variables && data.variables.map(item => (
      <FormItem
      {...formItemLayout}
      label={item.label}
      key={item.id}
      >
        {getFieldDecorator(String(item.id), {
          rules: [{
            required: true, message: `The ${item.name} must be not empty!`,
          }, {
            validator: (rule, value, callback) => _validatorFn([item.type, item.max_value, item.min_value], rule, value,callback)
          }],
        })(
          _renderContent(item.type)
        )}
      </FormItem>
    ))
    return htmlArr
  }

  const handleSubmit = function (e) {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        let formValue = {
          template_id: data.data.template_id,
          answers: []
        };
        for (let i in values) {
          if (values[i]._d) {
            values[i] = values[i]._d.getTime();
          }
          formValue.answers.push({
            value: values[i],
            variable_id: i
          })
        }
        dispatch({
          type: 'indexRecord/submit',
          payload: formValue
        }).then(res => {
          if (res.data.success && res.data.result) {
            Modal.success({
              title: '提交成功'
            })
          } else {
            Modal.error({
              title: '提交失败'
            })
          }
        })
      }
    });
  }



  return (
    <div className={styles.index}> 
      <Form className={styles.form}>
        {data && _renderHtml(data)}
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" onClick={(e) => handleSubmit(e)}>Submit</Button>
        </FormItem>
      </Form>
    </div>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object
};

export default Form.create()(connect(({ indexRecord }) => ({
  indexRecord
}))(IndexPage))
