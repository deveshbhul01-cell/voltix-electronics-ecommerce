import api from "./api.js";

export const placeOrder = async (
  payload
) => {
  const { data } =
    await api.post(
      "/orders",
      payload
    );

  return data;
};

export const getMyOrders =
  async () => {
    const { data } =
      await api.get(
        "/orders/my"
      );

    return data.orders || [];
  };

export const getOrderById =
  async (id) => {
    const { data } =
      await api.get(
        `/orders/${id}`
      );

    return data.order;
  };
