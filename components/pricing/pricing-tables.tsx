import React, { useState } from "react";

function PricingTables() {
  const [annual, setAnnual] = useState<boolean>(true);
  const [plans] = useState([
    {
      name: "Starter",
      blurb: "For people that only capture on one device",
      monthlyPrice: ["$", "0", "/month"],
      annualPrice: ["$", "0", "/month"],
      featured: false,
      features: [
        <span>Basic Pomodoro timer functionality 🍅</span>,
        <span>Task management and to-do lists ✅</span>,
        <span>Basic reminders ⏰</span>,
        <span>Basic offline features</span>,
        <span>Limited window statistics tracking</span>,
        <span>Basic data analytics support</span>,
      ],
      monthlyUrl: process.env.Link_Zendoro_Web,
      annualUrl: process.env.Link_Zendoro_Web,
      ctaText: "Try Web App Now",
    },
    {
      name: "Member",
      blurb: "For people who capture across multiple devices",
      monthlyPrice: ["$", process.env.NEXT_PUBLIC_PRICE_MONTHLY || "3", "/month"],
      annualPrice: ["$", process.env.NEXT_PUBLIC_PRICE_ANNUAL || "2", "/month"],
      featured: true,
      features: [
        <b>Everything on the free plan</b>,
        <span>Real-time sync across all platforms, including Apple, Android, Windows, and Web 💥</span>,
        <span>All functions related to time block statistics 📊</span>,
        <span>Window statistics record full support 🖥️</span>,
      ],
      monthlyUrl: "/download",
      annualUrl: "/download",
      ctaText: "Get started",
    },
    // {
    //   name: "Believer",
    //   blurb: "For people who believe in the future of Fleeting Notes",
    //   monthlyPrice: ["$", "12", "/month"],
    //   annualPrice: ["$", "10", "/month"],
    //   featured: false,
    //   features: [
    //     <b>Everything on the Basic plan</b>,
    //     <span>Notes from SMS and phone calls</span>,
    //     <span>AI powered link suggestions</span>,
    //     <span>And more to come...</span>,
    //   ],
    //   monthlyUrl: "/download",
    //   annualUrl: "/download",
    //   ctaText: "Get started",
    // },
  ]);

  return (
    <section className="bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="h1 mb-4" data-aos="zoom-y-out">
              All Essentials Covered, Zero Cost
            </h1>
            <p
              className="text-xl text-gray-600"
              data-aos="zoom-y-out"
              data-aos-delay="150"
            >
               Subscribe to login from anywhere.
            </p>
          </div>

          {/* Pricing tables */}
          <div>
            {/* Pricing toggle */}
            <div
              className="flex justify-center max-w-xs m-auto mb-16"
              data-aos="zoom-y-out"
              data-aos-delay="300"
            >
              <div className="relative flex w-full mx-6 p-1 bg-gray-200 rounded">
                <span
                  className="absolute inset-0 m-1 pointer-events-none"
                  aria-hidden="true"
                >
                  <span
                    className={`absolute inset-0 w-1/2 bg-white rounded shadow transform transition duration-150 ease-in-out ${
                      annual ? "translate-x-0" : "translate-x-full"
                    }`}
                  >
                  </span>
                </span>
                <button
                  className={`relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out ${
                    !annual && "text-gray-500"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setAnnual(true);
                  }}
                >
                  Bill Yearly <span className="text-green-500">-17%</span>
                </button>
                <button
                  className={`relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out ${
                    annual && "text-gray-500"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setAnnual(false);
                  }}
                >
                  Bill Monthly
                </button>
              </div>
            </div>

            <div className="max-w-sm md:max-w-2xl xl:max-w-2xl mx-auto grid gap-8 md:grid-cols-2 xl:grid-cols-2 xl:gap-6 items-start">
              {plans.map(
                (plan) => (
                  <div
                    key={plan.name}
                    className={`relative flex flex-col h-full py-5 px-6 rounded shadow-xl ${
                      plan.featured
                        ? "bg-blue-100 border-2 border-blue-500"
                        : "bg-white"
                    }`}
                    data-aos="zoom-y-out"
                    data-aos-delay="450"
                  >
                    {(plan.featured) && (
                      <div className="absolute top-0 right-0 mr-5 p-3 -mt-5 bg-yellow-500 rounded-full">
                        <svg
                          className="w-4 h-4 fill-current text-white"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15.145 5.05l-4.316-.627L8.898.513c-.338-.684-1.456-.684-1.794 0l-1.93 3.91-4.317.627a1.002 1.002 0 00-.554 1.707l3.124 3.044-.737 4.3a1 1 0 001.45 1.053L8 13.125l3.862 2.03c.728.381 1.59-.234 1.45-1.054l-.736-4.299L15.7 6.758a1.003 1.003 0 00-.555-1.708z" />
                        </svg>
                      </div>
                    )}
                    <div className="mb-4">
                      <div className="text-lg font-bold mb-1">{plan.name}</div>
                      <div className="inline-flex items-baseline mb-2">
                        <span className="text-3xl font-bold">
                          {(annual)
                            ? plan.annualPrice[0]
                            : plan.monthlyPrice[0]}
                        </span>
                        <span className="text-4xl font-bold">
                          {(annual)
                            ? plan.annualPrice[1]
                            : plan.monthlyPrice[1]}
                        </span>
                        <span className="text-gray-600 pl-2">
                          {(annual)
                            ? plan.annualPrice[2]
                            : plan.monthlyPrice[2]}
                        </span>
                      </div>
                      <div className="text-lg text-gray-800">{plan.blurb}</div>
                    </div>
                    <ul className="text-gray-600 -mb-2 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center mb-2">
                          <svg
                            className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                            viewBox="0 0 12 12"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-gray-200 pt-5 mt-6">
                      <a
                        className="btn-sm text-white bg-blue-600 hover:bg-blue-700 w-full text-center block"
                        href={(annual) ? plan.annualUrl : plan.monthlyUrl}
                      >
                        {plan.ctaText}
                      </a>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingTables;
