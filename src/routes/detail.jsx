import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import "../App.css";
import { Context1 } from "../App.jsx";
import { updateCart } from "../store.jsx";
import { useDispatch } from "react-redux";

let YellowBtn = styled.button`
  background: yellow;
  color: black;
  padding: 10px;
`;

let Box = styled.div`
  background: grey;
  padding: 20px;
`;

function Detail(props) {
  // let { stock } = useContext(Context1); // 🔹 보관함 해체, Context1을 사용하기 위해 선언
  //
  // a.push(props.shoes.find((item) => item.id === id));
  // localStorage.setItem("watched", JSON.stringify([]));

  let navigate = useNavigate();
  let dispatch = useDispatch();

  let { id } = useParams();
  id = parseInt(id, 10);
  let [alert, setAlert] = useState(true);
  let [tab, setTab] = useState(0);

  let findItem = props.shoes.find((item) => item.id === id);

  useEffect(() => {
    let watched = JSON.parse(localStorage.getItem("watched")) || [];
    // if (!watched.includes(findItem.id)) {
    //   watched.push(findItem.id);
    //   localStorage.setItem("watched", JSON.stringify(watched));
    // }
    console.log(watched);

    watched.push(findItem.id);
    watched = new Set(watched);
    watched = Array.from(watched);
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [id]); // id가 바뀔 때마다 실행됨

  let [fade, setFade] = useState(" ");
  useEffect(() => {
    let aniTimer = setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      clearTimeout(aniTimer);
      setFade("");
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // document.querySelector(".alert").style.display = "none";
      setAlert(false);
    }, 2000);
  }, []);

  let [num, setNum] = useState("");

  useEffect(() => {
    if (isNaN(num) == true) {
      window.alert("숫자만 입력해주세요");
    }
  }, [num]);

  return (
    <div className={`container start ${fade}`}>
      <Box>
        <YellowBtn>버튼</YellowBtn>
      </Box>
      {alert === true ? <div>2초 이내 구매시 할인</div> : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${id + 1}.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{findItem.name}</h4>
          <p>{findItem.content}</p>
          <p>{findItem.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              // console.log(findItem);
              dispatch(updateCart(findItem));
              navigate("/cart");
            }}
          >
            주문하기
          </button>
        </div>
      </div>
      <input type="text" onChange={(e) => setNum(e.target.value)} />

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} fade={fade} />
    </div>
  );
}

function TabContent({ tab }) {
  // if (tab == 0) {
  //   return <div>내용0</div>;
  // } else if (tab == 1) {
  //   return <div>내용1</div>;
  // } else if (tab == 2) {
  //   return <div>내용2</div>;
  // }

  let { stock } = useContext(Context1);

  let [fade, setFade] = useState(" ");
  useEffect(() => {
    let aniTimer = setTimeout(() => {
      setFade("end");
    }, 10);
    return () => {
      clearTimeout(aniTimer);
      setFade("");
    };
  }, [tab]);
  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default Detail;
