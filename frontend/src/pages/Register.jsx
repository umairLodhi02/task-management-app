import { Form, Input, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import CenteredFormLayout from "../components/Layout/CenteredFormLayout";

const Register = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      message.success("Registration successful!");
      navigate("/login");
    },
    onError: () => {
      message.error("Error registering user.");
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <CenteredFormLayout title={"Create new account"}>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="firstName"
          label="Enter First Name"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Enter Last Name"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
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
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Register
          </Button>
        </Form.Item>
      </Form>
      {/* Register button */}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <span>Already have an account? </span>
        <Link to="/login">
          <Button type="link">Login</Button>
        </Link>
      </div>
    </CenteredFormLayout>
  );
};

export default Register;
