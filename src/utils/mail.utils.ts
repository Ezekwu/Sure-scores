'use server';

import InviteTemplate from '@/Emails/InviteTemplate';
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
  receipient: string,
  subject: string,
  message: string,
}

export const sendInvite = async (invitedetails: InviteDetails) => {
  const {message, receipient, sender, subject} = invitedetails;
  const htmltemp = render(InviteTemplate({companyName: 'Codexx', inviter: 'Jeremiah ifeanyi', token: '29383h93N9'}))


  return await transporter.sendMail({
    from: sender,
    to: receipient,
    html: htmltemp,
    subject,
    text: message
  })
}