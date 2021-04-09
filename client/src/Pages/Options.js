import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { axios } from "../Functions/axios";

const Options = () => {
  const [newOrder, setNewOrder] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [pe, setPe] = useState('');


  const productsToAdd = [];

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

  const min = () => {
    setModalInsert(!modalInsert);
  };

  const postOrders = async () => {
    try {
      await axios.post("/order/add", newOrder).then((res) => {
        setNewOrder(null);
        toast.success("Orden hecha con exito");
      });
    } catch (err) {
      toast.error("No se pudo conectar con la base de datos");
      console.error(err.message);
    }
  };

  const onChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const onChangeProducts = (e) => {
    productsToAdd.push(e.target.value);
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

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div
      className="container-fluid d-flex justify-content-center bg-warning"
      style={{ paddingTop: "10vh" }}
    >
      <Card style={{ width: "35rem", height: "30rem" }}>
        <CardBody className="pt-5">
          <Button
            className="btn-success btn-block h-50 mt-5"
            onClick={() => <Redirect to="/dashboard" />}
          >
            Informe de compras
          </Button>
        </CardBody>
        <CardBody className="pt-5">
          <Button className="btn-danger btn-block h-50 mt-5" onClick={min()}>
            Comprar
          </Button>
        </CardBody>
      </Card>

      <Modal isOpen={modalInsert}>
        <ModalHeader style={{ display: "block" }}>
          <span style={{ float: "right" }} onClick={() => min()}>
            x
          </span>
        </ModalHeader>

        <form onSubmit={postOrders} className="h-100">
          <ModalBody>
            <div className="form-group row">
              <label htmlFor="id" className="col-sm-3 col-form-label">
                Numero de orden
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  name="_id"
                  value={orders ? orders[orders.length] + 1 : 1}
                  readOnly="true"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="username" className="col-sm-3 col-form-label">
                Nombre Completo
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  pattern="^([A-Za-z ])*$"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="username" className="col-sm-3 col-form-label">
                Productos
              </label>
            </div>
            <div className="form-group row">
              <div className="col-sm-9">
                <select
                  className="custom-select col-sm-9"
                  id="inten"
                  name="inten"
                  onChange={(e) => onChange(e)}
                  defaultValue="No repitas pedidos"
                >
                  <option >No repitas pedidos</option>
                  {
                    products.map(p => {
                      return(
                        <option key={p._id} value={{name: p.name, price: p.price}} onChange={e => {onChangeProducts(e); setPe(p.stock)}}>{p.name} </option>
                      )
                    })
                  }
                  
                </select>
                <div className="col-sm-3">
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  max={pe}
                  onChange={(e) => onChangeProducts(e)}
                />
              </div>

              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success btn-block">Comprar</button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default Options;
