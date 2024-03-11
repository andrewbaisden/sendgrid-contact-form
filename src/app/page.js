'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { usePost } from '@/app/hooks/usePost';

export default function ContactForm() {
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSent, setFormSent] = useState('');

  const { postRequest } = usePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(() => {
          const sendForm = async () => {
            try {
              const formData = {
                to: fromEmail, // Change to your recipient
                from: 'andrewbaisden@gmail.com', // Change to your verified sender
                subject: `Email enquiry from ${fromName}`,
                text: message,
                html: `
              Hello there!!!,
              <br /><br />
              You got a new message from ${fromName}.
              <br /><br />
              Message: ${message}
              `,
              };

              // Local developer testing API Route
              postRequest('http://localhost:3000/api/sendgrid', formData);

              const formMessageText = new Promise((resolve, reject) => {
                setTimeout(() => {
                  setFormSent('Message Sent!');

                  setTimeout(() => {
                    setFormSent('');

                    setFromName('');
                    setFromEmail('');
                    setMessage('');
                  }, 5000);
                }, 0);
              });
            } catch (error) {
              console.log(error);
            }
          };
          sendForm();
        })}
        className="flex flex-col bg-teal-600 p-5 rounded"
      >
        <div className="text-white">
          <h1 className="text-center text-2xl mb-4">Contact Us</h1>
        </div>
        <input
          {...register('name', { required: true })}
          aria-invalid={errors.name ? 'true' : 'false'}
          placeholder="Name"
          className="rounded-md p-2 mt-4 mb-4 text-black w-80"
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
        />
        {errors.name?.type === 'required' && (
          <p
            role="alert"
            className="text-white text-center font-bold mb-6 bg-rose-600"
          >
            A name is required
          </p>
        )}
        <input
          {...register('email', {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
          placeholder="Email"
          className="rounded-md p-2 mt-4 mb-4  text-black w-80"
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
        />
        {errors.email?.type === 'required' && (
          <p
            role="alert"
            className="text-white text-center font-bold mb-6 bg-rose-600"
          >
            A email address is required
          </p>
        )}
        {errors.email?.type === 'pattern' && (
          <p
            role="alert"
            className="text-white text-center font-bold mb-6 bg-rose-600"
          >
            A valid email address is required
          </p>
        )}

        <textarea
          {...register('message', { required: true })}
          aria-invalid={errors.message ? 'true' : 'false'}
          placeholder="Message"
          className="rounded-md p-2 mt-4 mb-4 text-black w-80"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {errors.message?.type === 'required' && (
          <p
            role="alert"
            className="text-white text-center font-bold mb-6 bg-rose-600"
          >
            A message is required
          </p>
        )}
        <input
          type="submit"
          className="bg-sky-500 rounded-md bg-gray-900 p-2 text-white hover:bg-black"
          style={{ cursor: 'pointer' }}
        />
        <p className="text-white text-center mt-2">{formSent}</p>
      </form>
    </div>
  );
}
