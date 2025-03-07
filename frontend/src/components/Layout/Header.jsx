import { Layout, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    Modal.confirm({
      content: "Are you sure you want to logout?",
      title: "Logout",
      okText: "Logout",
      okButtonProps: { color: "danger" },
      onOk: () => {
        localStorage.removeItem("token");
        queryClient.invalidateQueries(["auth"]);
        navigate("/login");
      },
    });
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "white", margin: 0 }}>Task Management App</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {user && (
          <span style={{ color: "white" }}>
            Welcome, {user.firstName} {user.lastName}
          </span>
        )}
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
