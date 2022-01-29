const express = require('express')
const mercadopago = require('mercadopago');

function initMercadoPagoRouter() {
  const router = express.Router()

  router.get('/payment/token', (req, res) => {
    res.json({
      token: process.env.MERCADOPAGO_PUBLIC_TOKEN
    })
  })
  router.post('/process_payment', (req, res) => {
    mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);
    const data = {
      ...req.body,
      transaction_amount: 800000
    }
    mercadopago.payment.save(data)
      .then(function (response) {
        const { status, status_detail, id } = response.body;
        res.status(response.status).json({ status, status_detail, id });
      })
      .catch(function (error) {
        console.error(error);
        res.status(406).json({status: 406, status_detail: 'Erro doing paiment'})
      });
  });

  return router;
}

module.exports = initMercadoPagoRouter
