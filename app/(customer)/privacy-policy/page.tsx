import Image from "next/image";


export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-16">
      {/* Header */}
      <div className="pt-25 text-center">
        <h1 className="font-playfair text-4xl font-semibold text-gray-800">
          Privacy Policy
        </h1>

        <p className="mt-4 text-gray-500">
          Your privacy is important to us. Learn how ShopNest collects,
          uses, and protects your information.
        </p>
      </div>

      {/* Content */}
      <div className="mt-12 space-y-8">

        {/* Introduction */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            1. Introduction
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Welcome to ShopNest. This Privacy Policy explains how we
            collect, use, and protect information when you use our website,
            create an account, place an order, or use our services.
          </p>
        </section>

        {/* Information We Collect */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            2. Information We Collect
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            When you use ShopNest, we may collect information that you
            provide to us, such as:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
            <li>Name and contact information</li>
            <li>Email address</li>
            <li>Delivery address</li>
            <li>Account login information</li>
            <li>Order and purchase details</li>
            <li>Information you provide when contacting customer support</li>
          </ul>
        </section>

        {/* How We Use Information */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            3. How We Use Your Information
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            We may use the information we collect to:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
            <li>Create and manage your account</li>
            <li>Process and deliver your orders</li>
            <li>Provide customer support</li>
            <li>Improve our website and services</li>
            <li>Communicate with you about your orders</li>
            <li>Prevent fraud and maintain website security</li>
          </ul>
        </section>

        {/* Account Information */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            4. Account Information
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            If you create an account on ShopNest, we store the information
            necessary to manage your account and provide our services.
            You are responsible for keeping your account credentials
            confidential.
          </p>
        </section>

        {/* Orders and Payments */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            5. Orders and Payments
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            When you place an order, we may collect information required
            to process and deliver your order. Payment information may be
            processed through secure third-party payment providers.
            ShopNest does not need to store your complete payment card
            details when payment is handled by a third-party provider.
          </p>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            6. Cookies
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            ShopNest may use cookies or similar technologies to keep you
            signed in, remember your preferences, improve website
            functionality, and understand how our website is used.
          </p>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            7. Data Security
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            We take reasonable steps to protect your personal information
            from unauthorized access, loss, misuse, or disclosure.
            However, no online service can guarantee complete security.
          </p>
        </section>

        {/* Sharing Information */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            8. Sharing of Information
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            We may share necessary information with trusted service
            providers who help us operate ShopNest, such as payment,
            delivery, hosting, and customer support services.
          </p>

          <p className="mt-3 leading-7 text-gray-600">
            We do not sell your personal information to third parties.
          </p>
        </section>

        {/* Third Party Services */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            9. Third-Party Services
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            ShopNest may use third-party services for authentication,
            payments, delivery, analytics, or other website functionality.
            These services may have their own privacy policies.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            10. Your Rights
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Depending on applicable laws, you may have the right to access,
            update, correct, or request deletion of your personal
            information. You can contact us if you want to exercise these
            rights.
          </p>
        </section>

        {/* Changes */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            11. Changes to This Privacy Policy
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            We may update this Privacy Policy from time to time. Any
            changes will be posted on this page with an updated date.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-xl bg-[#fff8f3] p-6">
          <h2 className="text-xl font-semibold text-[#F06A55]">
            12. Contact Us
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            If you have any questions about this Privacy Policy or how
            your information is handled, please contact the ShopNest
            support team through the contact details provided on our
            website.
          </p>
        </section>

      </div>
    </div>
  );
}
