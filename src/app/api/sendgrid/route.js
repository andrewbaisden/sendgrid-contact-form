import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const { to, from, subject, text, html } = await req.json();
    console.log(to, from, subject, text, html);

    const msg = {
      to: to, // Change to your recipient
      from: from, // Change to your verified sender
      subject: subject,
      text: text,
      html: html,
    };

    await sgMail.send(msg);
    return Response.json({ message: 'Email sent' });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message });
  }
}
