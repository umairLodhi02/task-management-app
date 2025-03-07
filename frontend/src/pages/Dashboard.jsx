import { useState } from "react";
import { Button, Form, Modal, Select, Space, Typography } from "antd";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";
import dayjs from "dayjs";
import { StatusList } from "../constant/Constants";
const { Option } = Select;
const { Title } = Typography;

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const [form] = Form.useForm();

  const showModal = (task = null) => {
    setSelectedTask(task);
    setIsModalVisible(true);
    if (task) {
      // Set form fields for editing
      form.setFieldsValue({
        ...task,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null, // Convert dueDate to dayjs object
      });
    } else {
      // Reset form fields for adding a new task
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
    form.resetFields();
  };

  const handleFilterChange = (value) => {
    setFilterStatus(value);
  };
  return (
    <div style={{ maxWidth: 1024, margin: "0 auto" }}>
      <Space
        style={{
          marginBottom: "16px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Space
          style={{
            justifyContent: "space-between",
          }}
        >
          <Title level={3} style={{ marginBottom: 0 }}>
            Filter Tasks:
          </Title>
          <Select
            defaultValue="All"
            style={{ width: 150 }}
            onChange={handleFilterChange}
          >
            {StatusList.map((status) => (
              <Option value={status} key={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Space>

        <Button type="primary" onClick={() => showModal()}>
          Add Task
        </Button>
      </Space>
      <TaskList onEdit={showModal} filterStatus={filterStatus} />

      <Modal
        title={selectedTask ? "Edit Task" : "Add Task"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <TaskForm form={form} task={selectedTask} onCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default Dashboard;
