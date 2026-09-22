import Product from "../models/Product.js";

export const getProducts = async (
  req,
  res
) => {
  try {
    const {
      search = "",
      category = ""
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    if (
      category &&
      category !== "All"
    ) {
      filter.category = category;
    }

    const products =
      await Product.find(filter)
        .sort({
          createdAt: -1
        });

    return res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Unable to load products."
    });
  }
};

export const getProductById = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found."
      });
    }

    return res.json({
      success: true,
      product
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid product ID."
    });
  }
};

export const createProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.create(
        req.body
      );

    return res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error.message
    });
  }
};

export const updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found."
      });
    }

    return res.json({
      success: true,
      product
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error.message
    });
  }
};

export const deleteProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found."
      });
    }

    return res.json({
      success: true,
      message:
        "Product deleted successfully."
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid product ID."
    });
  }
};
