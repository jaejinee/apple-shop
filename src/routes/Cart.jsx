import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAge } from "../store/userSlice.jsx";
import { changeCount } from "../store.jsx";

function Cart() {
  let cart = useSelector((state) => state.cart);
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();

  return (
    <div>
      <h5>
        {user.name} {user.age} 님의 장바구니{" "}
      </h5>
      <button
        onClick={() => {
          dispatch(changeAge(10));
        }}
      >
        버튾ㅎㅎ
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((a, i) => {
            return (
              <tr key={i}>
                <td>{cart[i].id}</td>
                <td>{cart[i].name}</td>
                <td>{cart[i].count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(changeCount(cart[i].id));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
