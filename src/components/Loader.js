import { Spinner } from "react-bootstrap";

export const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center text-center"
      style={{ marginTop: "20%" }}
    >
      <Spinner role="status" animation="grow">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
