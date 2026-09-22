import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

export const getAdminStats = async (req, res) => {
  try {
    const [
      users,
      products,
      orders,
      sales
    ] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        {
          $match: {
            status: {
              $ne: "Cancelled"
            }
          }
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$total"
            }
          }
        }
      ])
    ]);

    res.json({
      success: true,
      stats: {
        users,
        products,
        orders,
        revenue:
          sales[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Unable to load dashboard statistics."
    });
  }
};

export const getAllOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find()
        .populate(
          "user",
          "name email"
        )
        .sort({
          createdAt: -1
        });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Unable to load orders."
    });
  }
};

export const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const {
      status
    } = req.body;

    const allowed = [
      "Placed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid order status."
      });
    }

    const order =
      await Order.findById(
        req.params.id
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message:
          "Order not found."
      });
    }

    order.status = status;

    if (
      status === "Delivered" &&
      order.paymentMethod === "COD"
    ) {
      order.paymentStatus =
        "Paid";
    }

    await order.save();

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Unable to update order."
    });
  }
};
