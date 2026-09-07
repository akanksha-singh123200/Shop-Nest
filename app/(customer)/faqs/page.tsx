
"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "Browse the products, select your preferred product, add it to your cart, and proceed to checkout to place your order.",
  },
  {
    question: "Do I need an account to place an order?",
    answer:
      "Yes, you need to create an account or log in before completing your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept secure online payment methods available at checkout.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After your order is shipped, you can check your order status from the My Orders section of your account.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders are usually delivered within the estimated delivery time shown at checkout. Delivery time may vary depending on your location.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "You can request cancellation before the order is shipped. Once the order has been shipped, cancellation may not be possible.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes, eligible products can be returned or exchanged according to our Return & Refund Policy.",
  },
  {
    question: "What should I do if I receive a damaged or wrong product?",
    answer:
      "Please contact our support team as soon as possible with your order details. We will help you resolve the issue.",
  },
  {
    question: "Can I change my delivery address after placing an order?",
    answer:
      "Address changes may be possible if the order has not yet been shipped. Please contact us as soon as possible.",
  },
  {
    question: "How can I contact ShopNest customer support?",
    answer:
      "You can contact us through the contact details provided on our website. Our support team will be happy to assist you.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-6">

      {/* Header */}
      <div className="text-center">
        <h1 className="mt-25 font-playfair text-4xl">
          Frequently Asked Questions <span>(FAQs)</span>
        </h1>

        <p className="mt-4 text-gray-500">
          Find answers to the most common questions about ShopNest.
        </p>
      </div>

      {/* FAQ Container */}
      <div className="mx-auto mt-10 max-w-4xl space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`overflow-hidden rounded-xl border transition-colors duration-300 ${isOpen
                  ? "border-[#F06A55] bg-[#fff8f3]"
                  : "border-gray-200 bg-white"
                }`}
            >
              {/* Question */}
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff0e9] text-sm font-semibold text-[#F06A55]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`text-base font-semibold ${isOpen
                        ? "text-[#F06A55]"
                        : "text-gray-800"
                      }`}
                  >
                    {faq.question}
                  </span>
                </div>

                <ChevronDown
                  size={20}
                  className={`shrink-0 transition-transform duration-300 ${isOpen
                      ? "rotate-180 text-[#F06A55]"
                      : "text-gray-500"
                    }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pl-19 text-sm leading-7 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>




             

            </div>
          );
        })}
      </div>
       {/* Contact Section */}
              <div className="mx-auto mt-12 flex max-w-4xl items-center justify-between rounded-2xl bg-[#fff3ed] px-8 py-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Still have questions?
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Our support team is here to help you.
                  </p>
                </div>
                <Link href="/Contact">
                <button className="rounded-lg bg-[#F06A55] px-6 py-3 font-medium text-white transition hover:bg-[#e45b46]">
                  Contact Us
                </button></Link>
              </div>
    </div>
  );
}
