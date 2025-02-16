import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createContext, lazy, useEffect, useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// import Detail from "./routes/detail.jsx";
// import Cart from "./routes/Cart.jsx";

const Detail = lazy(() => import("./routes/detail.jsx"));
const Cart = lazy(() => import("./routes/Cart.jsx"));

// let Context1 = createContext(); //state 보관함

function App() {
  useEffect(() => {
    if (!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  // let obj = { name: "kim" };
  // localStorage.setItem("data", JSON.stringify(obj));
  // let test = JSON.parse(localStorage.getItem("data"));

  let [shoes, setShoes] = useState(data);
  let [page, setPage] = useState(2);
  let [hasMore, setHasMore] = useState(true); // 🔹 더 이상 데이터가 없는 경우를 추적
  let [loading, setLoading] = useState(false); // 🔹 로딩 상태 추가

  let navigate = useNavigate();

  let [stock] = useState([10, 11, 12]);

  let result = useQuery({
    queryKey: ["aa"],
    queryFn: async () => {
      const response = await axios.get(
        "https://codingapple1.github.io/userdata.json"
      );
      console.log("요청됨: " + response.data);
      return response.data;
    },
    staleTime: 4000,
  });

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
                navigate("/detail/0");
              }}
            >
              Details
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {/* {result.isLoading ? "로딩중" : result.data.name} */}
            {result.isLoading && "로딩중"}
            {result.error && "에러 발생"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <RecentItem shoes={shoes} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"> </div>
              <Container>
                <Row>
                  {shoes.map((shoe, i) => {
                    return <Card shoes={shoe} i={i} key={shoe.id} />;
                  })}
                </Row>
              </Container>

              {loading ? (
                <p>로딩 중...</p> // 🔹 데이터 로드 중일 때 표시
              ) : (
                <button
                  onClick={() => {
                    if (loading) return; // 이미 로딩 중이면 중복 요청 방지
                    setLoading(true); // 요청 시작 시 로딩 상태 활성화
                    axios
                      .get(
                        `https://codingapple1.github.io/shop/data${page}.json`
                      )
                      .then((result) => {
                        let newShoes = [...shoes, ...result.data]; // array나 object 상태를 변경할 때에는 먼저 복사를 해야한다.
                        setShoes(newShoes); // 그리고 그 복사값을 setShoes에 넣어 변경해준다.
                        setPage(page + 1);
                      })
                      .catch(() => {
                        alert("더 이상 상품이 없습니다.");
                        setHasMore(false);
                      })
                      .finally(() => {
                        setLoading(false); // 요청이 끝나면 로딩 상태 비활성화
                      });
                  }}
                  disabled={!hasMore}
                >
                  더보기
                </button>
              )}
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ stock }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="/event" element={<Event />}>
          <Route path="one" element={"첫 주문시 양배추즙 서비스"} />
          <Route path="two" element={"생일기념 쿠폰받기"} />
        </Route>
        <Route path="*" element={<div>없는 페이지</div>} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function RecentItem({ shoes }) {
  let seenItem = JSON.parse(localStorage.getItem("watched")) || [];
  return (
    <div>
      {seenItem
        ? seenItem.map((item) => {
            return (
              <>
                <img
                  src={
                    "https://codingapple1.github.io/shop/shoes" +
                    (shoes[item].id + 1) +
                    ".jpg"
                  }
                  alt=""
                  width="10%"
                />
                <div>{shoes[item].name}</div>;
              </>
            );
          })
        : " "}
    </div>
  );

  // useEffect(() => {
  //   if (seenItem) {
  //     seenItem.length > 0
  //       ? seenItem.map((item) => {
  //           return <div>{shoes[item].name}</div>;
  //         })
  //       : " ";
  //   }
  // }, [seenItem]);
}

function Card(props) {
  return (
    <Col sm>
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        alt=""
        width="80%"
      />
      <h4>{props.shoes.name}</h4>
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
export const Context1 = createContext(); // ✅ 이렇게 export 추가
export default App;
