import {
  Modal,
  Button,
  ToggleButton,
  ButtonGroup,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { Loader } from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { AddExpense } from "../redux/actions/expense";

export const AddExpenseModel = (props) => {
  const [radioValue, setRadioValue] = useState("1");
  const [price, setPrice] = useState("");
  const [validation, setValidation] = useState(true);
  const [category, setCategory] = useState(0);
  const [comments, setComments] = useState("");
  const loading = useSelector((state) => state.expenseReducer.loading);
  const dispatch = useDispatch();
  const expenseStatus = useSelector((state) => state.expenseReducer.expenseStatus);


  useEffect(() => {
    if (expenseStatus == 200) {
      props.onHide("Success", "Woohoo,Successfully Added!");
    }
    else if(expenseStatus==500)
    {
      props.onHide("Failed", "Something went wrong,Please try again");
    }
  }, [expenseStatus])

  const debitedArray = [
    { value: "Food", name: "Food" },
    { value: "Shopping", name: "Shopping" },
    { value: "Paid to Friend", name: "Friend la dilo" },
    { value: "Money Lost", name: "Haravle Paise" },
    { value: "Investment", name: "Investment Vroo" },
    { value: "Other", name: "Other" },
  ];

  const creditedArray = [
    { value: "Salary", name: "Salary" },
    { value: "Received from friend", name: "Friend ni dila" },
    { value: "Found on road", name: "Rastyavr sapadle" },
    { value: "Investment profit", name: "Investment vroo" },
    { value: "Bonus", name: "Bonus Vroo" },
    { value: "Other", name: "Other" },
  ];
  const radios = [
    { name: "Paishe Udavlo", value: "1" },
    { name: "Paishe Ale", value: "2" },
  ];
  const priceChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setPrice(e.target.value);
    }

    if (
      !re.test(e.target.value) ||
      e.target.value == "" ||
      e.target.value == 0
    ) {
      setValidation(true);
    } else {
      setValidation(false);
    }
  };

  const addExpense = () => {
    // setLoaded(true);
    const payload = {
      price: price,
      comments: comments == "" ? "none" : comments,
      category: category == 0 ? "Other" : category,
      type: radioValue == 1 ? "DEBIT" : "CREDIT",
    };
    console.log(price, category, comments, radioValue);
    dispatch(AddExpense(payload));
  };


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {loading && <Modal.Header >
        <Modal.Title >
          Loading....Please wait
        </Modal.Title>
      </Modal.Header>}
      {
        !loading &&
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Aaj Kiti Udavla?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ButtonGroup className="mb-2">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="secondary"
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <br></br>
            <br></br>
            <input
              value={price}
              onChange={priceChange}
              placeholder="Kiti Udavla"
            />

            <br></br>
            <br></br>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="Other">
                {radioValue == "1" ? "Kuta udavla" : "Kutna ale paishe"}
              </option>

              {radioValue == "1"
                ? debitedArray.map((e) => {
                  return <option value={e.value}>{e.name}</option>;
                })
                : creditedArray.map((e) => {
                  return <option value={e.value}>{e.name}</option>;
                })}

            </Form.Select>
            <br></br>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Comments"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                onChange={(e) => setComments(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" disabled={validation} onClick={addExpense}>
              Add
            </Button>
          </Modal.Footer>
        </>
      }
    </Modal >

  );

};
