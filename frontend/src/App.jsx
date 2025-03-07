import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Layout/Header";
import useAuth from "./hooks/useAuth";
import { Layout } from "antd";
const { Content, Footer } = Layout;

const App = () => {
  const { data: isAuthenticated } = useAuth();

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {isAuthenticated && <Header />}
        <Content style={{ padding: "24px" }}>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>Created by Umair Nadeem</Footer>
      </Layout>
    </Router>
  );
};

export default App;
