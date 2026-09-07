import Image from "next/image";

export default function TermsAndConditions() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="mt-10 font-playfair text-4xl font-semibold text-gray-800">
          Terms & Conditions
        </h1>

        <p className="mt-4 text-gray-500">
          Please read these terms carefully before using ShopNest.
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Last Updated: September 4, 2026
        </p>
      </div>

      {/* Content */}
      <div className="mx-auto mt-12 max-w-4xl space-y-8">

        {/* Introduction */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            1. Introduction
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Welcome to ShopNest. ShopNest is an online shopping platform that
            allows users to browse products, add products to their cart or
            wishlist, place orders, make payments, and manage their orders.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            By accessing or using ShopNest, you agree to follow and be bound
            by these Terms & Conditions. If you do not agree with any part of
            these terms, please do not use our website.
          </p>
        </section>

        {/* Use of Website */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            2. Use of Our Website
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            You agree to use ShopNest only for lawful purposes and in a way
            that does not harm the website or other users.
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
            <li>Do not use the website for illegal activities.</li>
            <li>Do not attempt to damage or disrupt the website.</li>
            <li>Do not try to gain unauthorized access to the website.</li>
            <li>Do not copy or misuse website content without permission.</li>
            <li>Do not provide false or misleading information.</li>
          </ul>
        </section>

        {/* User Account */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            3. User Account
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Some features of ShopNest may require you to create an account.
            When creating an account, you agree to provide accurate and
            complete information.
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
            <li>Keep your account information accurate and up to date.</li>
            <li>Keep your login credentials secure.</li>
            <li>Notify us if you notice unauthorized access to your account.</li>
          </ul>

          <p className="mt-3 leading-7 text-gray-600">
            You are responsible for activities performed through your account.
          </p>
        </section>

        {/* Products */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            4. Products and Product Information
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            We try our best to ensure that product names, descriptions,
            images, prices, and other information displayed on ShopNest are
            accurate.
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
            <li>Product colors may appear slightly different on different screens.</li>
            <li>Product availability may change without prior notice.</li>
            <li>Product information may occasionally require updates.</li>
          </ul>
        </section>

        {/* Pricing */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            5. Pricing
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            All product prices displayed on ShopNest are subject to change
            without prior notice.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            If an incorrect price is displayed due to a technical or human
            error, ShopNest reserves the right to correct the price and, where
            necessary, cancel the affected order.
          </p>
        </section>

        {/* Orders */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            6. Placing an Order
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            When you place an order through ShopNest, you agree that the
            information provided by you is accurate and that you have reviewed
            your order before submitting it.
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
            <li>Provide a correct delivery address.</li>
            <li>Provide accurate contact information.</li>
            <li>Complete the required payment for your order.</li>
          </ul>

          <p className="mt-3 leading-7 text-gray-600">
            ShopNest may cancel an order in certain situations, including
            product unavailability, pricing errors, payment issues, or other
            circumstances affecting order fulfillment.
          </p>
        </section>

        {/* Payment */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            7. Payment
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            ShopNest may provide different payment methods during checkout.
            Payments are processed through the payment methods or payment
            service providers available at checkout.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            You agree to provide accurate payment information when making a
            purchase.
          </p>
        </section>

        {/* Shipping */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            8. Shipping and Delivery
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            We aim to deliver your order within the estimated delivery time
            shown during the ordering process.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            Delivery times may vary depending on your location, product
            availability, courier delays, weather conditions, or other
            unforeseen circumstances.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            Please ensure that the delivery address and contact details
            provided during checkout are correct.
          </p>
        </section>

        {/* Cancellation */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            9. Order Cancellation
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            You may request cancellation of an order before it is shipped,
            subject to the applicable cancellation process.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            Once an order has been shipped, cancellation may not be possible.
          </p>
        </section>

        {/* Returns */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            10. Returns, Exchanges and Refunds
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Returns, exchanges, cancellations, and refunds are subject to our
            Return & Refund Policy.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            If you receive a damaged, defective, or incorrect product, please
            contact ShopNest customer support as soon as possible with your
            order details.
          </p>
        </section>

        {/* Reviews */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            11. Reviews and User Content
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            ShopNest may allow users to submit product reviews or other
            content. Reviews should be genuine and related to the user's
            experience.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            Users must not post abusive, offensive, misleading, or illegal
            content. ShopNest reserves the right to remove content that
            violates these Terms & Conditions.
          </p>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            12. Intellectual Property
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            All content available on ShopNest, including the website design,
            logo, branding, product descriptions, images, text, graphics, and
            icons, may be protected by applicable intellectual property laws.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            You may not copy, reproduce, modify, distribute, or use ShopNest
            content for commercial purposes without prior permission.
          </p>
        </section>

        {/* Third Party */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            13. Third-Party Services
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            ShopNest may use third-party services for payment processing,
            shipping, authentication, analytics, or other website
            functionality.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            The use of such services may also be subject to the terms and
            policies of the respective third-party providers.
          </p>
        </section>

        {/* Website Availability */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            14. Website Availability
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            We aim to keep ShopNest available and functioning properly.
            However, we cannot guarantee that the website will always be
            available without interruption.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            The website may occasionally be unavailable because of maintenance,
            technical issues, server problems, security updates, or other
            circumstances beyond our control.
          </p>
        </section>

        {/* Liability */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            15. Limitation of Liability
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            ShopNest will make reasonable efforts to provide accurate
            information and reliable services.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            However, ShopNest is not responsible for losses or damages
            resulting from circumstances beyond our reasonable control,
            including technical failures, third-party service interruptions,
            delivery delays, or temporary website unavailability.
          </p>
        </section>

        {/* Changes */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            16. Changes to These Terms
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            ShopNest may update or modify these Terms & Conditions from time
            to time.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            Any changes will be posted on this page with an updated
            <span className="font-medium text-gray-700">
              {" "}Last Updated
            </span>{" "}
            date.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            17. Contact Us
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            If you have any questions, concerns, or complaints regarding these
            Terms & Conditions, you can contact the ShopNest support team
            through the contact details provided on our website.
          </p>
        </section>

        {/* Acceptance */}
        <section className="rounded-xl border border-[#F06A55]/20 bg-[#fff8f3] p-6">
          <h2 className="text-xl font-semibold text-[#F06A55]">
            18. Acceptance of Terms
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            By accessing, browsing, creating an account, or placing an order
            on ShopNest, you acknowledge that you have read, understood, and
            agreed to these Terms & Conditions.
          </p>
        </section>

      </div>
    </div>
  );
}