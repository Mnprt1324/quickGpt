import { useState } from "react";
import toast from "react-hot-toast";
import { purchaseCreditsApi } from "../api/api";

const usePurchaseCredit = () => {
  const [loading, setLoading] = useState(false);

  const purchaseCredits = async (planId) => {
    setLoading(true);
    try {
      const res = await purchaseCreditsApi(planId);
      if (res.data.success) {
        window.location.href = res.data.url;
        // toast.success("Purchased Complete");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Purchase Failed");
      setLoading(false);
    }
  };
  return { loading, purchaseCredits };
};

export default usePurchaseCredit;
