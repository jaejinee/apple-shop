import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/detail.jsx";

function App() {
  let [shoes] = useState(data);
  let navigate = useNavigate();
  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Details
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"> </div>
              <Container>
                <Row>
                  {shoes.map((shoe, i) => {
                    return <Card shoes={shoe} i={i} />;
                  })}
                </Row>
              </Container>
            </>
          }
        />
        <Route path="/detail" element={<Detail />} />
        <Route path="/event" element={<Event />}>
          <Route path="one" element={"첫 주문시 양배추즙 서비스"} />
          <Route path="two" element={"생일기념 쿠폰받기"} />
        </Route>
        <Route path="*" element={<div>없는 페이지</div>} />
      </Routes>
    </div>
  );
}

function Card(props) {
  // let [shoesImg] = useState([
  //   "https://codingapple1.github.io/shop/shoes1.jpg",
  //   "https://codingapple1.github.io/shop/shoes2.jpg",
  //   "https://codingapple1.github.io/shop/shoes3.jpg",
  // ]);
  return (
    <Col sm>
      {/* <img src={shoesImg[props.i]} alt="" width="80%" /> */}
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        alt=""
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </Col>
  );
}

function Event() {
  return (
    <>
      <div>오늘의 이벤트</div>
      <Outlet />
    </>
  );
}
export default App;
