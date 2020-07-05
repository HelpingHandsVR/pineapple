import Queue from 'bull'

const emailSender = new Queue('email sending')

export {
  emailSender,
}
