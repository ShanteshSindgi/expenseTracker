import { useState } from "react";
import { Toast,ToastContainer, Row, Col, Button } from "react-bootstrap";
export const ToastMessage = ({title,message}) => {
  const [show, setShow] = useState(true);

  return (
    <Row className="justify-content-md-center center" >
      <Col xs={12}>
      <ToastContainer position="top-center" className="p-3">

        <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{title}</strong>
          </Toast.Header>
  <Toast.Body>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
};
