import Image from "next/image";

export default function ShippingAndDelivery() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">

      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mt-10 font-playfair text-4xl font-semibold text-gray-800">
          Shipping & Delivery
        </h1>

        <p className="mt-4 text-gray-500">
          Everything you need to know about order processing, shipping,
          delivery times, and tracking your ShopNest orders.
        </p>
      </div>

      {/* Content */}
      <div className="mx-auto mt-12 max-w-4xl space-y-8">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            1. Order Processing
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Once your order is successfully placed and payment is confirmed,
            we begin processing your order. Orders are generally processed
            within the required processing time before being dispatched.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            2. Delivery Time
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Orders are usually delivered within{" "}
            <span className="font-medium text-gray-800">
              3–7 business days
            </span>{" "}
            after dispatch. Delivery time may vary depending on your
            location, product availability, courier service, and other
            factors.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            3. Shipping Charges
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Applicable shipping charges, if any, will be displayed clearly
            during checkout before you place your order. The final shipping
            cost will be included in your order summary.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            4. Order Tracking
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Once your order has been shipped, tracking information may be
            provided. You can use the available tracking details to check
            the status of your delivery.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            5. Delivery Delays
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            We make reasonable efforts to deliver your order within the
            estimated delivery time. However, delays may occur due to
            weather conditions, public holidays, courier service issues,
            technical problems, high order volumes, or other circumstances
            beyond our reasonable control.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            6. Incorrect or Incomplete Address
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Customers are responsible for providing a complete and accurate
            delivery address and contact information. ShopNest is not
            responsible for delays, additional shipping charges, or failed
            deliveries caused by incorrect or incomplete address
            information.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            7. Failed Delivery
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            If a delivery attempt is unsuccessful because the customer is
            unavailable, cannot be contacted, or refuses to accept the
            package, the courier may make another delivery attempt or return
            the package according to the applicable shipping process.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            8. Damaged or Incorrect Package
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            If you receive a damaged, defective, or incorrect product,
            please contact the ShopNest support team as soon as possible
            with your order details. The issue will be handled according to
            our Return & Refund Policy.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            9. Delivery Confirmation
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            An order will be considered delivered once the courier service
            confirms successful delivery to the address provided by the
            customer.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            10. Contact Us
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            If you have any questions regarding your order, shipping, or
            delivery, please contact the ShopNest support team through the
            contact details available on our website.
          </p>
        </section>

      </div>

      {/* Last Updated */}
      <p className="mx-auto mt-12 max-w-4xl text-sm text-gray-400">
        Last Updated: September 2026
      </p>
    </div>
  );
}