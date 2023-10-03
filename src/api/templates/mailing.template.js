export const TEMPLATES = {
  ticketProcessed: (options) => {
    let productsTemplate = ''
    options.products.forEach((product) => {
      productsTemplate += `
      <tr>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
      </tr>`
    })
    const enoughStockTemplate = options.isPartialPurchase
      ? '<p>Unfortunately some products in your cart are out of stock 😯.  Only the following products could be processed:</p>'
      : ''
    return {
      from: `Coderhouse Ecommerce <${process.env.APP_EMAIL}>`,
      to: [options.recipient],
      subject: 'Your order has been placed ☺',
      html: `
            <div>
                <h1>Hi! Thank you for your purchase</h1>
                ${enoughStockTemplate}
                <table>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                  ${productsTemplate}
                </table>
                <p>Thank you for your purchase, we look forward to having you back again.</p>
            </div>`
    }
  },
  ticketNoStock: (options) => {
    return {
      from: `Coderhouse Ecommerce <${process.env.APP_EMAIL}>`,
      to: [options.recipient],
      subject: 'Noooo! Sorry, we have no stock for your order 😭.',
      html: `
            <div>
                <h1>Your order could not be processed.</h1>
                <p>We regret to inform you that we do not have stock for any of the products you selected. </p>
                <p>As soon as we have new units we will inform you. </p>
                <p>We apologize for any inconvenience this may cause.</p>
            </div>`,
    }
  },
  resetPassword: (options) => {
    return {
      from: 'David from Vivo <davidmonterourena@gmail.com>',
      to: [options.recipient],
      subject: 'Password Reset!',
      html: `
            <div>
                <h1>Hi! Welcome to Vivo Platform</h1>
                <p>To restore your password please click <a href="http://localhost:8080/restorePassword?token=${options.token}">here</a></p>
                <h3>Your token is ${options.token}</h3>
                <img src="cid:vivo_logo" width="100"/>
            </div>`,
      attachments: [
        {
          filename: 'Brand.png',
          path: './src/docs/logo.png',
          cid: 'vivo_logo'
        }
      ]
    }
  }
}
