import { Table, Toast, ToastContainer, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import axios from "axios";
import { Loader } from "./Loader";

function Total({ message, total }) {
  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        className=" position-relative"
        style={{ minHeight: "240px" }}
      >
        <ToastContainer className="p-3" position={"top-center"}>
          <Toast bg="success">
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">TOTAL</strong>
              <strong>Rs {total}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}

export const Records = () => {
  const [loaded, setLoaded] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [records, setRecords] = useState([]);
  let m_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const recordApiCall = () => {
    setLoaded(false);
    const query = `?month=${
      m_names[startDate.getMonth()]
    }&year=${startDate.getFullYear()}`;
    axios
      .get(
        process.env.GET_EXPENSE_URL
          ? process.env.GET_EXPENSE_URL + query
          : `https://expense-tracker77.herokuapp.com/user/getExpense${query}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          res.data.records && setRecords(res.data);
          setLoaded(true);
        }
      })
      .catch((e) => {
        console.log("err", e.response);
        if (e.response.status == 404) {
          setLoaded(true);
          setRecords(404);
        }
      });
  };
  useEffect(() => {
    recordApiCall();
  }, [startDate]);

  if (loaded) {
    return (
      <>
        <div style={{ marginLeft: "20px" }}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            showTwoColumnMonthYearPicker
          />
        </div>
        <br></br>
        {records && records.records && records.records.length > 0 ? (
          <>
            <Table responsive striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Day</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Comments</th>
                </tr>
              </thead>

              <tbody>
                {records.records.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.day}</td>
                      <td>{item.price}</td>
                      <td
                        style={{
                          color: item.type == "DEBIT" ? "red" : "green",
                        }}
                      >
                        {item.type}
                      </td>
                      <th>{item.category}</th>

                      <td>{item.comments}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Total message={records.message} total={records.totalDebit} />
          </>
        ) : records && records == 404 ? (
          <Alert variant="danger">No records found!</Alert>
        ) : (
          <Loader></Loader>
        )}
      </>
    );
  } else {
    return <Loader></Loader>;
  }
};
