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
    console.log(`${process.env.HOST}`)
    return {
      from: `Coderhouse Ecommerce <${process.env.APP_EMAIL}>`,
      to: [options.recipient],
      subject: 'Have you requested to reset your password? 🤔',
      html: `
            <div>
                <h1>Your restoration link has been generated</h1>
                <p>To restore your password please click <a href="${process.env.HOST}/restorePassword?token=${options.token}">here</a></p>
            </div>`
    }
  },
  passwordChanged: (options) => {
    return {
      from: `Coderhouse Ecommerce <${process.env.APP_EMAIL}>`,
      to: [options.recipient],
      subject: 'Your password has been changed!',
      html: `
            <div>
                <h1>Your password has been reset by using a reset link.</h1>
                <p>If it wasn't you, please change your password immediately by clicking on <a href="${process.env.HOST}/resetPasswordRequest">this link</a></p>
            </div>`
    }
  },
  deletedAccount: (options) => {
    return {
      from: `Coderhouse Ecommerce <${process.env.APP_EMAIL}>`,
      to: [...options.recipients],
      subject: 'Your account has been deleted. 😯',
      html: `
            <div>
                <h1>Your account has been deleted due to inactivity</h1>
                <p>We regret any inconvenience this may have caused.</p>
                <p>Remember that you are always welcome to create a new account.</p>
                <p>Best Regads,</p>
                <p>Coderhouse Ecommerce Team</p>
            </div>`
    }
  }

  
}
