import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (
  req,
  res
) => {
  try {
    const {
      items,
      shippingAddress
    } = req.body;

    if (
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty."
      });
    }

    const {
      fullName,
      phone,
      address,
      city,
      state,
      postalCode
    } = shippingAddress || {};

    if (
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !postalCode
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please complete your shipping address."
      });
    }

    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product =
        await Product.findById(
          item.productId
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "One of the products no longer exists."
        });
      }

      const quantity =
        Number(item.quantity);

      if (
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid product quantity."
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message:
            `${product.name} has only ${product.stock} item(s) remaining.`
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        icon: product.icon,
        image: product.image,
        price: product.price,
        quantity
      });

      subtotal +=
        product.price * quantity;
    }

    const shippingCharge =
      subtotal >= 5000 ? 0 : 99;

    const total =
      subtotal + shippingCharge;

    const order =
      await Order.create({
        user: req.user._id,

        items: orderItems,

        shippingAddress: {
          fullName,
          phone,
          address,
          city,
          state,
          postalCode,
          country:
            shippingAddress.country ||
            "India"
        },

        subtotal,
        shippingCharge,
        total,

        paymentMethod: "COD"
      });

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: -item.quantity
          }
        }
      );
    }

    return res.status(201).json({
      success: true,
      message:
        "Order placed successfully.",
      order
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Unable to place order."
    });
  }
};

export const getMyOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find({
        user: req.user._id
      }).sort({
        createdAt: -1
      });

    return res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Unable to load your orders."
    });
  }
};

export const getOrderById = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findOne({
        _id: req.params.id,
        user: req.user._id
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found."
      });
    }

    return res.json({
      success: true,
      order
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid order ID."
    });
  }
};
