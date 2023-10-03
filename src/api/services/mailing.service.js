import nodemailer from 'nodemailer'
import { TEMPLATES } from '../templates/mailing.template.js'

export class MailingService {
  constructor() {
    this.APP_EMAIL = process.env.APP_EMAIL
    this.APP_PASSPORT = process.env.APP_PASSPORT
    this.templates = {
      TICKET_PROCESSED: 'ticketProcessed',
      RESTORE_PASSWORD: 'resetPassword',
      TICKET_NO_STOCK: 'ticketNoStock',
      PASSWORD_CHANGED: 'passwordChanged'
    }
  }

  sendEmail(template, options) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: this.APP_EMAIL,
        pass: this.APP_PASSPORT
      }
    })

    return transporter.sendMail(TEMPLATES[template](options))
  }
}
