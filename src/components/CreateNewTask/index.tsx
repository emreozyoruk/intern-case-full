import React, { useState } from 'react';
import { Button, Modal, Input, Form, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addTask } from '../Redux/taskSlice';  

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};



const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    dispatch(addTask(values));
    form.resetFields();
    setIsModalOpen(false);
  };

  

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Task
      </Button>
      <Modal title="Add Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <TextArea rows={4} placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="urgency"
            label="Urgency"
            rules={[{ required: true, message: 'Please select the urgency!' }]}
          >
            <Select placeholder="Urgency" allowClear>
              <Option value="urgent">Urgent</Option>
              <Option value="high">High</Option>
              <Option value="low">Low</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default App;
