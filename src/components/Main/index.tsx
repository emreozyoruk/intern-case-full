// src/components/TaskManager.tsx
import React, { useState } from 'react';
import { Button, Modal, Input, Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { addTask, updateTask } from '../Redux/taskSlice';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../TaskManager.scss';

const { TextArea } = Input;
const { Option } = Select;

const TaskManager: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setCurrentTask(null);
  };

  const onFinish = (values: any) => {
    if (isEdit && currentTask) {
      dispatch(updateTask(Object.assign({}, currentTask, values)));
    } else {
      dispatch(addTask(values));
    }
    form.resetFields();
    setIsModalOpen(false);
    setIsEdit(false);
    setCurrentTask(null);
  };

  const onEdit = (task: any) => {
    setCurrentTask(task);
    form.setFieldsValue(task);
    setIsEdit(true);
    showModal();
  };

  const renderTasks = (status: string) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} />
      ));
  };

  const countTasks = (status: string) => {
    return tasks.filter((task) => task.status === status).length;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-manager">
       
        <Modal title={isEdit ? 'Edit Task' : 'Add Task'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form form={form} onFinish={onFinish}>
            <Form.Item name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ required: true, message: 'Please input the description!' }]}
            >
              <TextArea rows={4} placeholder="Description" />
            </Form.Item>
            <Form.Item
              name="urgency"
              rules={[{ required: true, message: 'Please select the urgency!' }]}
            >
              <Select placeholder="Urgency" allowClear>
                <Option value="urgent">Urgent</Option>
                <Option value="high">High</Option>
                <Option value="low">Low</Option>
              </Select>
            </Form.Item>
            {isEdit && (
              <Form.Item
                name="status"
                rules={[{ required: true, message: 'Please select the status!' }]}
              >
                <Select placeholder="Status" allowClear>
                  <Option value="new">New</Option>
                  <Option value="inprogress">In Progress</Option>
                  <Option value="done">Done</Option>
                </Select>
              </Form.Item>
            )}
          </Form>
        </Modal>
        <div className="task-columns">
          <TaskColumn status="new" tasks={tasks} renderTasks={renderTasks} countTasks={countTasks} />
          <TaskColumn status="inprogress" tasks={tasks} renderTasks={renderTasks} countTasks={countTasks} />
          <TaskColumn status="done" tasks={tasks} renderTasks={renderTasks} countTasks={countTasks} />
        </div>
      </div>
    </DndProvider>
  );
};

const TaskCard: React.FC<{ task: any; onEdit: any }> = ({ task, onEdit }) => {
 
  const [, drag] = useDrag(() => ({
    type: 'TASK',
    item: task,
  }));

  return (
    <div ref={drag} className={`task-card ${task.urgency}`}>
      <h4>{task.title}</h4>
      <p>{task.date}</p>
      <p>{task.urgency}</p>
      <Button onClick={() => onEdit(task)}>Edit</Button>
    </div>
  );
};

const TaskColumn: React.FC<{ status: string; tasks: any; renderTasks: any; countTasks: any }> = ({
  status,
  renderTasks,
  countTasks,
}) => {
  const dispatch = useDispatch();
  const [, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: any) => {
      dispatch(updateTask({ ...item, status }));
    },
  }));

  return (
    <div ref={drop} className="task-column">
      <h3>
        {status.charAt(0).toUpperCase() + status.slice(1)} <span>({countTasks(status)})</span>
      </h3>
      {renderTasks(status)}
    </div>
  );
};

export default TaskManager;
