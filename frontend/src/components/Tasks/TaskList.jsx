import { Table, Button, Tag, Space, Modal, message, Select } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTasks, deleteTask, updateTask } from "../../api/tasks";
import dayjs from "dayjs";
import { StatusList } from "../../constant/Constants";
const { Option } = Select;

const TaskList = ({ onEdit, filterStatus }) => {
  const queryClient = useQueryClient();

  const isCompletedTask = (status) => status === "Completed";

  const { data: tasks, isPending } = useQuery({
    queryKey: ["tasks", filterStatus],
    queryFn: () =>
      fetchTasks(filterStatus === "All" ? undefined : filterStatus),
  });

  const { mutate: deleteTaskMutation, isPending: isLoadingDelete } =
    useMutation({
      mutationFn: deleteTask,
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks"]);
        message.success("Task deleted successfully!");
      },
      onError: () => {
        message.error("Error deleting task.");
      },
    });

  const { mutate: updateTaskStatus } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      message.success("Task status updated successfully!");
    },
    onError: () => {
      message.error("Error updating task status.");
    },
  });

  const handleStatusChange = (id, newStatus) => {
    updateTaskStatus({ id, status: newStatus });
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Confirmation",
      content: "Are you sure you want to delete this task?",
      okText: "Delete",
      okButtonProps: { color: "danger" },
      onOk: () => deleteTaskMutation(id),
    });
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        if (isCompletedTask(status)) {
          return <Tag color="green">{status}</Tag>;
        } else {
          return (
            <Select
              defaultValue={status}
              style={{ width: "100%" }}
              onChange={(value) => handleStatusChange(record._id, value)}
            >
              {StatusList.slice(1).map((status) => (
                <Option value={status} key={status}>
                  {status}
                </Option>
              ))}
            </Select>
          );
        }
      },
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (dueDate) =>
        dueDate ? dayjs(dueDate).format("YYYY-MM-DD") : "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => onEdit(record)}
            disabled={isCompletedTask(record.status)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record._id)}
            loading={isLoadingDelete}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={tasks?.data}
      columns={columns}
      loading={isPending}
      rowKey="_id"
    />
  );
};

export default TaskList;
