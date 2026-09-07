import Image from "next/image";

export default function ReturnAndRefund() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">

      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mt-10 font-playfair text-4xl font-semibold text-gray-800">
          Return & Refund Policy
        </h1>

        <p className="mt-4 text-gray-500">
          Please read our return and refund policy carefully before
          requesting a return or refund for your ShopNest order.
        </p>
      </div>

      {/* Content */}
      <div className="mx-auto mt-12 max-w-4xl space-y-8">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            1. Return Eligibility
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Eligible products may be returned within{" "}
            <span className="font-medium text-gray-800">
              7 days
            </span>{" "}
            of delivery. To be eligible for a return, the product must be
            unused, in its original condition, and returned with its
            original packaging, tags, and accessories, where applicable.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            2. Reasons for Return
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            A return may be accepted if the product is damaged, defective,
            incorrect, or does not meet the applicable return conditions.
            Return eligibility may vary depending on the product category.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            3. Non-Returnable Products
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Certain products may not be eligible for return due to their
            nature, hygiene requirements, customization, or other
            applicable restrictions. Products that have been used, damaged
            by the customer, altered, or returned without their original
            packaging may also be rejected.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            4. How to Request a Return
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            To request a return, contact the ShopNest support team with
            your order details and the reason for the return. For damaged,
            defective, or incorrect products, you may be asked to provide
            photographs or other relevant information to help us verify
            the issue.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            5. Return Approval
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Once your return request is received, ShopNest will review the
            request and determine whether the product meets the applicable
            return conditions. Customers will be informed about the next
            steps after the request has been reviewed.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            6. Refund Process
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            If your return is approved and the returned product is received
            and verified, the eligible refund will be processed through the
            applicable payment method or refund process.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            7. Refund Time
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Refunds may take a few business days to appear in your account
            after they have been processed. The exact time may depend on
            your payment provider or bank.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            8. Return Shipping Charges
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Return shipping charges, if applicable, may depend on the
            reason for the return and the applicable return conditions.
            Customers may be responsible for return shipping costs when
            the return is requested for reasons other than a damaged,
            defective, or incorrect product.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            9. Damaged or Incorrect Products
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            If you receive a damaged, defective, or incorrect product,
            please contact ShopNest support as soon as possible after
            delivery. Please keep the product, packaging, and other
            relevant materials until the issue has been resolved.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            10. Order Cancellation
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Customers may request cancellation before the order is shipped.
            Once an order has been shipped, cancellation may not be
            possible and the customer may need to follow the applicable
            return process.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            11. Exchange
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Product exchanges may be available for eligible products,
            subject to product availability and the applicable return
            conditions. If an exchange is not available, an eligible
            refund may be offered instead.
          </p>
        </section>

        {/* 12 */}
        <section>
          <h2 className="text-xl font-semibold text-[#F06A55]">
            12. Contact Us
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            If you have any questions about returns, refunds, exchanges,
            or cancellations, please contact the ShopNest support team
            through the contact details available on our website.
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

