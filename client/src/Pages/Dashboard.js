import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, Modal, ModalBody, ModalHeader } from "reactstrap";
import { axios } from "../Functions/axios";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [orderSpecific, setOrderSpecific] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [modalInfo, setModalInfo] = useState(false);
  const [modalInfoID, setModalInfoID] = useState(0);
  const [modalInsert, setModalInsert] = useState(false);

  const mi = () => {
    setModalInfo(!modalInfo);
  };

  const min = () => {
    setModalInsert(!modalInsert);
  };

  const getOrders = async () => {
    try {
      await axios.get("/order").then((res) => {
        setOrders(res.data);
      });
    } catch (err) {
      toast.error("No se pudo conectar con la base de datos");
      console.error(err.message);
    }
  };

  const getOrderSpecific = async (id) => {
    try {
      await axios.get(`/order/${id}`).then((res) => {
        setOrderSpecific(res.data);
      });
    } catch (err) {
      toast.error("No se pudo conectar con la base de datos");
      console.error(err.message);
    }
  };

  const getOrdersProducts = async (id) => {
    try {
      await axios.get(`/op/${id}`).then((res) => {
        setOrderProducts(res.data);
      });
    } catch (err) {
      toast.error("No se pudo conectar con la base de datos");
      console.error(err.message);
    }
  };

  const getProducts = async () => {
    try {
      await axios.get(`/products`).then((res) => {
        setProducts(res.data);
      });
    } catch (err) {
      toast.error("No se pudo conectar con la base de datos");
      console.error(err.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <div className="d-flex flex-wrap">
        {orders.map((ord) => {
          return (
            <Card
              key={ord._id}
              onClick={() => {
                mi();
                setModalInfoID(ord._id);
                getOrdersProducts(ord._id);
                getOrderSpecific(ord._id);
              }}
            >
              <CardBody>
                <div className="row">
                  <span className="col-sm-6 text-left">Numero de pedido: </span>
                  <span className="col-sm-6 text-right">{ord._id}</span>
                </div>
                <div className="row">
                  <span className="col-sm-6 text-left">Subtotal: </span>
                  <span className="col-sm-6 text-right">{ord.subtotal}</span>
                </div>
                <div className="row">
                  <span className="col-sm-6 text-left">IVA: </span>
                  <span className="col-sm-6 text-right">{ord.iva}</span>
                </div>
                <div className="row">
                  <span className="col-sm-6 text-left">Total: </span>
                  <span className="col-sm-6 text-right">{ord.total}</span>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Modal isOpen={modalInfo}>
        <ModalHeader style={{ display: "block" }}>
          <span style={{ float: "right" }} onClick={() => mi()}>
            x
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <span className="col-sm-6 text-left">Numero de pedido: </span>
            <span className="col-sm-6 text-right">{modalInfoID}</span>
          </div>
          <div className="row">
            <span className="col-sm-6 text-left">Usuario: </span>
            <span className="col-sm-6 text-right">
              {orderSpecific.username}
            </span>
          </div>
          <span>Productos Comprados: </span>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orderProducts.map((op) => {
                return (
                  <tr key={op.product_id}>
                    <th scope="row">{op.name}</th>
                    <td>{op.amount} </td>
                    <td>{op.subtotal}</td>
                  </tr>
                );
              })}
              <div className="row">
                <span className="col-sm-6 text-left">Fecha de compra: </span>
                <span className="col-sm-6 text-right">
                  {orderSpecific.created_at}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">Subtotal: </span>
                <span className="col-sm-6 text-right">
                  {orderSpecific.subtotal}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">IVA {`(19)`}: </span>
                <span className="col-sm-6 text-right">{orderSpecific.iva}</span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">Total: </span>
                <span className="col-sm-6 text-right">
                  {orderSpecific.total}
                </span>
              </div>
            </tbody>
          </table>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Dashboard;
