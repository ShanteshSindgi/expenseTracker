import { Table, Toast, ToastContainer, Alert, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../redux/actions/transactions";
import { Loader } from "./Loader";
import { CSVLink } from "react-csv";
import { Piechart } from "./PieChart";

import randomColor from "randomcolor";

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
          <Toast bg={eval(total < 5000) ? "success" : "danger"}>
            <Toast.Header closeButton={false}>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">TOTAL</strong>
              <strong>Rs {total}</strong>
            </Toast.Header>
            <Toast.Body><strong style={{ color: eval(total < 5000) ? 'black' : 'white' }}>{message}</strong></Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}

export const Records = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [pieChartData, setPieChartData] = useState([]);
  const records = useSelector((state) => state.transactionReducer.records);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.transactionReducer.loading);
  const error = useSelector((state) => state.transactionReducer.error);
  const [csvDatas, setcsvDatas] = useState([]);

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
    const query = `?month=${m_names[startDate.getMonth()]
      }&year=${startDate.getFullYear()}`;

    dispatch(getTransactions(query));
  };
  useEffect(() => {
    recordApiCall();
  }, [startDate]);

  useEffect(() => {
    const pieData = [];
    let categories = {};

    if (records && records.records && records.records.length > 0) {
      const data = records.records.map((item, index) => {
        delete item._id;
        delete item.__v;
        delete item.email;
        let category = item.category;
        let temp = categories[category];
        temp ? categories[category]++ : categories[category] = 1
        return item;
      });

      for (let category in categories) {
        console.log(category);
        pieData.push({ title: category, value: categories[category], color: randomColor() })
      }

      data.push({ total: records.totalDebit })
      setcsvDatas(data);
      setPieChartData(pieData);
      console.log("data", pieData);
    }
  }, [records])


  if (!loading) {
    return (
      <div style={{background:'grey'}}>

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
        {records && records.records && records.records.length > 0 &&
          <div style={{ position: 'absolute', right: '10px' }}>
            <CSVLink data={csvDatas.length > 0 ? csvDatas : ''}
              style={{ color: 'orange', fontWeight: 'bolder' }}
              filename={startDate && m_names[startDate.getMonth()] + " " + startDate.getFullYear()}
              target="_blank" ><strong>Download CSV</strong></CSVLink>

          </div>

        }
        <br></br>
        {records && records.records && records.records.length > 0 ? (
          <div style={{background:'grey'}}>
            <Table responsive striped bordered hover variant="light" size="sm">
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
            <Row>
              <Col>
                <Piechart data={pieChartData}></Piechart>
              </Col>
              <Col>
                <Total message={records.message} total={records.totalDebit} />
              </Col>
            </Row>
          </div>
        ) : error && error == 404 && !loading ? (
          <Alert variant="danger">No records found!</Alert>
        ) : (
          <Loader></Loader>
        )}
      </div>
    );
  } else {
    return <Loader></Loader>;
  }
};
