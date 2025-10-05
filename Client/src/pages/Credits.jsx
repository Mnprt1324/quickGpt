import React, { useEffect, useState } from "react";
import { getAllPlans } from "../api/api";
import usePurchaseCredit from "../hooks/usePurchaseCredit";
import toast from "react-hot-toast";

const Credits = () => {
  const [plans, setPlans] = useState([]);
  const {loading,purchaseCredits}=usePurchaseCredit();
  const getPlan = async () => {
    try {
      const res = await getAllPlans();
      if (res.data.success) {
        setPlans(res.data.plans);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handelPurchase=()=>{
  //   purchaseCredits

  // }
  useEffect(() => {
    getPlan();
  }, []);
  return (
    <div className="flex-1 mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className=" text-3xl font-semibold text-center  mb-10 text-gray-800 dark:text-white">
        Credit Plans
      </h2>

      <div className="flex  flex-wrap justify-center gap-8">
        {plans.map((plan, index) => (
          <div
            key={plan._id}
            className={`border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${
              plan._id === "pro" ? "bg-purple-50" : "bg-white"
            }`}
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-2xl font-bold text-purple-600 mb-4">
                ${plan.price}
                <span className="text-xl text-gray-700"> /{plan.credits} credits </span>
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {plan.features.map((feat, indx) => (
                  <li key={indx}>{feat}</li>
                ))}
              </ul>
            </div>
            <button onClick={()=>toast.promise(purchaseCredits(plan._id),"Processing...")} className="mt-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium py-2 rounded transition-colors cursor-pointer">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credits;
