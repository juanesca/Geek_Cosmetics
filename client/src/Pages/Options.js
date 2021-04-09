import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Card, CardBody } from 'reactstrap'
import { axios } from '../Functions/axios';

const Options = () => {
    const [newOrder, setNewOrder] = useState([]);

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

    
    return (
        <div className="container-fluid d-flex justify-content-center bg-warning" style={{paddingTop: '10vh'}}>
            <Card style={{ width: "35rem", height: "30rem" }}>
                <CardBody className='pt-5'>
                    <Button className="btn-success btn-block h-50 mt-5">
                        Informe de compras
                    </Button>
                    
                </CardBody>
                <CardBody className='pt-5'>
                    <Button className="btn-danger btn-block h-50 mt-5">
                        Comprar
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default Options
