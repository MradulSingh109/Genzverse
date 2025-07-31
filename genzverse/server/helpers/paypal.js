const paypal = require('paypal-rest-sdk');


paypal.configure({
    mode: 'sandbox',
    client_id: 'AbtYGd0Lzmm994YnncAWxB64v5cR9M1eHzdWJ9b9cfu_ZibSKBRk2slJskHaPvcFaHE52mgggyJL51s0',
    client_secret:"ENX-IJY9aj723FyY4y8UdOSM-SKBKjcvtkQzAeqGLz_BDrfVh6RgKUh-Q6yTm-QuJFU1X0Hx8GVFCBTW"
})

module.exports = paypal