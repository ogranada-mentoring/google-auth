const express = require('express')
const { createOrder, captureOrder } = require('../services/paypal')

function initPaypalPayment() {
  const router = express.Router()

  router.get('/payment/paypalurl', async (req, res) => {
    const order = await createOrder();
    console.log(order);
    if (order.statusCode === 201) {
      const path = order.result.links.find(link => link.rel === 'approve').href;
      console.log();
      res.status(201).json({
        path //: 'http://google.com?q=joke'
      })
    } else {
      res.status(406).json({
        message: 'failed'
      })
    }
  });

  router.get('/sample/payment/paypalurl', async (req, res) => {
    const order = await createOrder();
    console.log(order);
    if (order.statusCode === 201) {
      const path = order.result.links.find(link => link.rel === 'approve').href;
      console.log();
      res.redirect(path);
    } else {
      res.status(406).json({
        message: 'failed'
      })
    }
  });

  router.get('/payment/paypal/callback', async (req, res) => {
    const {
      token,
      PayerID
    } = req.query;
    const captureResponse = await captureOrder(token);
    if (captureResponse.result.status === 'COMPLETED') {
      return res.status(200).json({message: 'Compra exitosa.'})
    }
    res.status(406).json({message: 'Compa fallida.'})
  })

  return router;
}

module.exports = initPaypalPayment
