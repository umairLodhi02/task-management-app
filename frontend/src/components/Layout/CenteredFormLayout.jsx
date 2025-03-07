import { Layout, Row, Col, Typography, Card } from "antd";

const { Title } = Typography;

const CenteredFormLayout = ({ title, children }) => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "80vh" }}>
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <Card
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "24px" }}
          >
            {title}
          </Title>
          {children}
        </Card>
      </Col>
    </Row>
  );
};

export default CenteredFormLayout;
