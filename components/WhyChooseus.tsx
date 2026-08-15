"use client";

export default function WhyChooseUs() {
  return (
    <section className=" min-h-screen  py-16 px-4">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Why Choose Us?
        </h2>

        <p className="text-gray-500 mt-3 text-lg">
          We make your shopping experience simple, secure and enjoyable.
        </p>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Fast Delivery */}
        <div className="bg-gray-100 p-8 rounded-2xl text-center hover:shadow-lg transition duration-300">
          <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9 text-blue-950"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1-1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1-1.5 0Z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900">
            Fast Delivery
          </h3>

          <p className="text-gray-500 mt-2 leading-6">
            Get your orders delivered quickly and safely.
          </p>
        </div>

        {/* Secure Payments */}
        <div className="bg-gray-100 p-8 rounded-2xl text-center hover:shadow-lg transition duration-300">
          <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9 text-blue-950"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21H6.75a2.25 2.25 0 0 1-2.25-2.25v-6a2.25 2.25 0 0 1 2.25-2.25Z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900">
            Secure Payments
          </h3>

          <p className="text-gray-500 mt-2 leading-6">
            Your payments are protected with secure checkout.
          </p>
        </div>

        {/* Quality Products */}
        <div className="bg-gray-100 p-8 rounded-2xl text-center hover:shadow-lg transition duration-300">
          <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9 text-blue-950"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900">
            Quality Products
          </h3>

          <p className="text-gray-500 mt-2 leading-6">
            We offer carefully selected quality products.
          </p>
        </div>

        {/* 24/7 Support */}
        <div className="bg-gray-100 p-8 rounded-2xl text-center hover:shadow-lg transition duration-300">
          <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9 text-blue-950"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.13 1.5 2.059v5.18a2.25 2.25 0 0 1-2.25 2.25h-1.5a2.25 2.25 0 0 0-2.25 2.25v.75M20.25 8.511A7.5 7.5 0 0 0 12 3.75a7.5 7.5 0 0 0-8.25 4.761m16.5 0v.001M3.75 8.511A7.5 7.5 0 0 0 3 10.57v5.18A2.25 2.25 0 0 0 5.25 18h1.5A2.25 2.25 0 0 1 9 20.25V21"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900">
            24/7 Support
          </h3>

          <p className="text-gray-500 mt-2 leading-6">
            We're always here to help you with your queries.
          </p>
        </div>

      </div>
    </section>
  );
}