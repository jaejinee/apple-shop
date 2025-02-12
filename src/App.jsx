import "./App.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <div className="App">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        className="main-bg"
        style={{
          backgroundImage:
            "url(https://www.w3schools.com/w3images/forestbridge.jpg)",
        }}
      >
        {" "}
      </div>

      <Container>
        <Row>
          <Col sm>
            <img
              src="https://codingapple1.github.io/shop/shoes1.jpg"
              alt=""
              width="80%"
            />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col sm>
            <img
              src="https://codingapple1.github.io/shop/shoes2.jpg"
              alt=""
              width="80%"
            />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col sm>
            <img
              src="https://codingapple1.github.io/shop/shoes3.jpg"
              alt=""
              width="80%"
            />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
