const router = require('express').Router();
const db = require('./../db/db');

/* ORDERS */
router.get('/order',async (req, res) => {
    try {
        let connection = await db.connect();
        const Orders = await connection.query("SELECT * FROM orders");
        connection.release();

        const body = Orders.rows;
        res.status(200).json(body);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server error")
    }
});

router.get('/order/:id',async (req, res) => {
    try {
        const { id } = req.params;
        let connection = await db.connect();
        const Order = await connection.query("SELECT * FROM orders WHERE _id = $1",[id]);
        connection.release();

        const body = Order.rows;
        res.status(200).json(body);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server error")
    }
});

router.post('/order/add', async (req, res) => {
    try {
        const {username, subtotal, iva, total, products} = req.body;
        let connection = await db.connect();
        const order = await connection.query("INSERT INTO orders (username,subtotal,iva,total) VALUES ($1,$2,$3,$4) RETURNING _id",[username,subtotal,iva,total]);

        const order_id = order.rows[0]._id;

        for (let i = 0; i < products.length ; i++) {
            try {
                let {product_id,amount,subtotal,name} = products[i];
                await connection.query("INSERT INTO op (order_id,product_id,amount,subtotal,name) VALUES ($1,$2,$3,$4,$5) RETURNING _id",[order_id,product_id,amount,subtotal,name]);
            } catch (err) {
                console.log(err.message);
                res.status(500).json("Server error");
            }
        }
        connection.release();
        res.status(200);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server error")
    }
});

/* PRODUCTS x ORDER */

router.get('/op/:o_id',async (req, res) => {
    try {
        const { o_id } = req.params;
        let connection = await db.connect();
        const order_products = await connection.query("SELECT * FROM op WHERE order_id = $1",[o_id]);
        connection.release();

        const body = order_products.rows;
        res.status(200).json(body);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server error")
    }
});

/* PRODUCTS */

router.get('/products',async (req, res) => {
    try {
        let connection = await db.connect();
        const products = await connection.query("SELECT * FROM products");
        connection.release();

        const body = products.rows;
        res.status(200).json(body);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server error")
    }
});

router.post('/products/add',async (req, res) => {
    try {
        const {name,price,stock} = req.body;
        const _v = 1;
        let connection = await db.connect();
        await connection.query("INSERT INTO products(name,price,stock) VALUES ($1,$2,$3,$4) ",[name,price,stock,_v]);
        connection.release();


        res.status(200);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server error")
    }
});

router.post('/products/edit/:id',async (req, res) => {
    try {
        const {name,price,stock} = req.body;
        const {id} = req.params;
        let connection = await db.connect();
        const product = await connection.query("SELECT * FROM products WHERE _id = $1",[id]);

        if (price !== product.rows[0].price) {
            const _v = product.rows[0]._v + 1;
            await connection.query("INSERT INTO products(name,price,stock) VALUES ($1,$2,$3,$4) ",[name,price,stock,_v]);
            await connection.query("DELETE FROM products WHERE _id = $1",[id]);
        } else {
            await connection.query("UPDATE products SET (stock)=($1) WHERE _id = $2",[stock,id]);
        }
        connection.release();

        res.status(200);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server error")
    }
});

router.post('/products/delte/:id',async (req, res) => {
    try {
        const {id} = req.params;
        let connection = await db.connect();
        
        await connection.query("DELETE FROM products WHERE _id = $1",[id]);

        connection.release();
        res.status(200);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server error")
    }
});





module.exports = router;
