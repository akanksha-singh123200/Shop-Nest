"use client";

import AdminNavbar from "@/components/AdminNavbar";

export default function Reports() {
  const reports = [
    {
      title: "Product Wise Sales Report",
      icon: "🛒",
      bg: "bg-[#81766d]",
    },
    {
      title: "Product Wise Purchase Report",
      icon: "📦",
      bg: "bg-[#668094]",
    },
    {
      title: "Party Wise Sales Report",
      icon: "👨‍💼",
      bg: "bg-[#81776e]",
    },
    {
      title: "Party Wise Purchase Report",
      icon: "🧾",
      bg: "bg-[#71858f]",
    },
    {
      title: "Sales Summary Report",
      icon: "📊",
      bg: "bg-[#82756b]",
    },
    {
      title: "Purchase Summary Report",
      icon: "💰",
      bg: "bg-[#6f8492]",
    },
  ];

  return (
    <>
      <AdminNavbar />

      <div className="ml-64 min-h-screen bg-[#f5f5f5] px-6 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">

         {/* Header */}
          <div className="mb-5 mt-10">
            <h2 className="text-3xl  md:text-3xl font-bold">
              Reports
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Manage Report.
            </p>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {reports.map((report, index) => (
              <div
                key={index}
                className="flex h-[190px] cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-200 bg-white shadow-[0_3px_10px_rgba(0,0,0,0.15)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Icon Circle */}
                <div
                  className={`flex h-[108px] w-[108px] items-center justify-center rounded-full ${report.bg}`}
                >
                  <span className="text-[52px]">
                    {report.icon}
                  </span>
                </div>

                {/* Report Title */}
                <h3 className="mt-3 text-center text-[14px] font-bold text-gray-900">
                  {report.title}
                </h3>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}