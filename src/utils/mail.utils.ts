'use server';

import InviteTemplate from 'Emails/InviteTemplate';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})

type InviteDetails = {
  sender: string,
  senderName: string,
  receipient: string,
  subject: string,
  message: string,
  token: string, 
  companyName: string,

}

export const sendInvite = async (invitedetails: InviteDetails) => {
  const {message, receipient, sender, subject, token, companyName, senderName} = invitedetails;
  const htmltemp = render(InviteTemplate({companyName: companyName, inviter: senderName, token: token}))


  return await transporter.sendMail({
    from: sender,
    to: receipient,
    html: htmltemp,
    subject,
    text: message
  })
}
