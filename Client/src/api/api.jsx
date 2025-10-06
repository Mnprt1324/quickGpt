import axios from "axios";
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("quickToken")}`,
  },
});

export const getUserDetails = () => {
  return api.get(`/user/getuser`);
};
export const loginUserApi = (data) => {
  return api.post(`/user/login`, data);
};

export const getAllUserChat = () => {
  return api.get(`chat/get-chat`);
};
export const getAllPlans = () => {
  return api.get(`credit/plans`);
};

export const createNewChat = () => {
  return api.post(`/chat/create`);
};
export const deleteChat = (chatId) => {
  return api.post(`/chat/delete-chat`, { chatId });
};
export const sendMessageApi = (data) => {
  return api.post(`/message/${data.mod}`, data);
};

export const purchaseCreditsApi = (planId) => {
  return api.post("/credit/purchase", { planId });
};
export const paymntVerifyApi = (sessionId) => {
  return api.post("/credit/payment-verify", { sessionId });
};

export const signupApi = (data) => {
  return api.post("/user/register", data);
};

export const logoutApi = () => {
  return api.post("/user/logout");
};

export const commImageApi=()=>{
return api.get("/user/published-images")
}
