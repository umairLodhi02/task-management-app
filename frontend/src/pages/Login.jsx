import { Form, Input, Button, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import CenteredFormLayout from "../components/Layout/CenteredFormLayout";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const data = response.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      queryClient.invalidateQueries(["auth"]);
      message.success(response.message);
      navigate("/dashboard");
    },
    onError: () => {
      message.error("Invalid credentials.");
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <CenteredFormLayout title="Login">
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label="Enter Email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Enter Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <span>Don't have an account? </span>
        <Link to="/register">
          <Button type="link">Register</Button>
        </Link>
      </div>
    </CenteredFormLayout>
  );
};

export default Login;
