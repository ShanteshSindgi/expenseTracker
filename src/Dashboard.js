import { Card, Button, Container, Row, Col } from "react-bootstrap";
import DashboardIcon from "./monitor.png";
import moneyIcon from "./moneys.png";
import "./dashboard.css";
import { useState } from "react";
import { AddExpenseModel } from "./addExpenseModal";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "./Toast";
export const Dashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [toastMessage,setToastMessage]=useState({})
  const navigate = useNavigate();
  return (
    <>
      {successMessage ? <ToastMessage title={toastMessage.title} message={toastMessage.message} key={Math.random()} /> : ""}
      <Container fluid className="my-auto  ">
        <Row
          className="justify-content-md-center center"
          style={{ marginTop: "10%" }}
        >
          <Col md={4} sm={4} xs={12}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                style={{
                  maxWidth: "100px",
                  alignSelf: "center",
                  marginTop: "20px",
                }}
                src={DashboardIcon}
                className="img-fluid"
              />
              <Card.Body>
                <Card.Title>Dashboard</Card.Title>
                <Card.Text>View your transaction records.</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => {
                    navigate("/records");
                  }}
                >
                  View
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={4} xs={12}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={moneyIcon}
                style={{
                  maxWidth: "100px",
                  alignSelf: "center",
                  marginTop: "20px",
                }}
              />
              <Card.Body>
                <Card.Title>Add Expense</Card.Title>
                <Card.Text>Add your daily expense.</Card.Text>
                <Button
                  variant="dark"
                  onClick={() => {
                    setModalShow(true);
                    setSuccessMessage(false);
                  }}
                >
                  Add
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <AddExpenseModel
        key={Math.random()}
        show={modalShow}
        onHide={(title,message) => {
          setModalShow(false);
          setSuccessMessage(true);
          setToastMessage({title,message})
        }}
      />
    </>
  );
};
