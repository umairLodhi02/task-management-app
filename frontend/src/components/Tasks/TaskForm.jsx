import { Form, Input, DatePicker, Select, Button, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, updateTask } from "../../api/tasks";
import dayjs from "dayjs";

const TaskForm = ({ form, task, onCancel }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: task ? updateTask : createTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      onCancel();
      message.success(
        task ? "Task updated successfully!" : "Task created successfully!"
      );
    },
    onError: () => {
      message.error("Error saving task.");
    },
  });

  const onFinish = (values) => {
    if (task) {
      mutate({
        id: task._id,
        ...values,
      });
    } else {
      mutate(values);
    }
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="title"
        label="Enter Title"
        rules={[{ required: true, message: "Please enter the title!" }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Enter Description"
        rules={[{ required: true, message: "Please enter the description!" }]}
      >
        <Input.TextArea placeholder="Description" />
      </Form.Item>
      <Form.Item
        name="dueDate"
        label="Select Due Date"
        rules={[{ required: true, message: "Please select due date!" }]}
      >
        <DatePicker
          placeholder="Due Date"
          disabledDate={disabledDate}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {task ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
