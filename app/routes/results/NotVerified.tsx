import React from 'react';

const NotVerified: React.FC = () => {
  return (
    <main className="relative isolate min-h-full">
      <img
        src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Not Verified
        </h1>
        <p className="mt-4 text-lg text-white/70 sm:mt-6">
          <b>You haven't been verified yet.</b>
        </p>
        <p className="mt-4 text-base text-white/70 sm:mt-6">
          If you've already paid or world like to gain access
        </p>
        <div>
          <a
            href="mailto:eliotkjackson@gmail.com"
            className="inline-block px-8 py-2 mt-5 text-sm font-semibold leading-7 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            Contact Eliot
          </a>
        </div>
        {/* <div className="mt-10 flex justify-center"> */}
        {/*  <a href="/" className="text-sm font-semibold leading-7 text-white"> */}
        {/*    <div> */}
        {/*      <span aria-hidden="true">&larr;</span> Back to home */}
        {/*    </div> */}
        {/*  </a> */}
        {/* </div> */}
      </div>
    </main>
  );
};

export default NotVerified;
