import api from "./api.js";

const normalizeProduct = (product) => ({
  ...product,
  id: product._id
});

export const getProducts = async () => {
  const { data } = await api.get("/products");

  return (data.products || []).map(
    normalizeProduct
  );
};

export const getProductById = async (id) => {
  const { data } = await api.get(
    `/products/${id}`
  );

  return normalizeProduct(
    data.product
  );
};
