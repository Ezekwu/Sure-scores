
import { sendInvite } from '@/src//utils/mail.utils';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest, res:NextResponse) {    
  const data = await req.json();
    
  // if(req.method !== 'POST') {
  //   return NextResponse.json({ message: `Method ${req.method} Not Allowed`,  },) 
  // }

  // const { inviteEmail, senderCompany, senderName } = await req.json();
  // return NextResponse.json({
  //   data
  // })
  // console.log(inviteEmail, senderCompany, senderName, );
  

  // if(!inviteEmail || !senderCompany || !senderName){
  //   return NextResponse.json({ message: "incomplete data" }, { status: 400 })
  // }

  // return NextResponse.json({ message: "success",  }, { status: 201 });

  try {
    const response = await sendInvite({sender: '"Workroom" <ezekwujerry@gmail.com>', message: 'Accept the invite to start collaborating', receipient: data.inviteEmail, subject: `${data.senderName} has invited you to work with them in workroom`, companyName: data.companyName, senderName: data.senderName,  token: data.companyId})
    
    return new NextResponse('invite sent successfully', {
      status: 200,
    })

  } catch (error) {
    return new Response(`invite error: ${error}`, {
      status: 400,
    })
  }
}
  
  

