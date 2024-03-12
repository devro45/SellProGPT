const Product = require("../models/product");
const User = require("../models/user");
const mongoose = require("mongoose");
const formidable = require("formidable");
const { validationResult } = require("express-validator");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          error: "Product not found in database",
        });
      }
      req.product = product;
      next();
    })
    .catch((err) => {
      res.status(500).json({
        error: "Internal server error",
      });
    });
};

exports.uploadProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    console.log("enetering");
    if (err) {
      return res.status(400).json({
        error: "Some problem occured with image",
      });
    }
    console.log("furst");
    const { name, description, price, category } = fields;

    const product = new Product({
      name: name.toString(),
      description: description.toString(),
      price: parseFloat(price), // Assuming price should be converted to a number
      category: category.toString(),
    });
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        error: "Please include all these fields",
      });
    }
    console.log("sec");
    // let product = new Product(fields);
    const publisherId = req.params.userId;
    product.userId = publisherId;

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too large!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }
    product
      .save()
      .then((savedProduct) => {
        res.json({
          message: `${savedProduct.name} uploaded and sent to admin for approval.`,
        });
      })
      .catch((error) => {
        console.error("Error saving product:", error);
        res.status(400).json({
          error: `Failed to upload ${name}`,
        });
      });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  Product.deleteOne({ _id: product._id })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(400).json({
          error: `Failed to delete ${product.name}`,
        });
      }
      res.json({
        message: `Deleted ${product.name} successfully`,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: `Failed to delete ${product.name}`,
      });
    });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Some problem occurred with image",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too large!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }

    product
      .save()
      .then((updatedProduct) => {
        res.json(updatedProduct);
      })
      .catch((err) => {
        res.status(400).json({
          error: `Failed to update ${product.name}.`,
        });
      });
  });
};

exports.getVerifiedProducts = (req, res) => {
  Product.find({ isVerified: true })
    .select("-photo")
    .populate("category")
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(400).json({
        error: "Error occurred while loading products",
      });
    });
};

exports.getProductsByUser = (req, res) => {
  const userId = req.params.userId;
  Product.find({ userId: userId })
    .select("-photo -userId")
    .populate("category")
    .then((products) => {
      if (products.length === 0) {
        return res.status(400).json({
          error: "You haven't uploaded any product to sell",
        });
      }
      res.json(products);
    })
    .catch((err) => {
      res.status(400).json({
        error: "Error occurred while fetching products",
      });
    });
};

exports.getUnverifiedProducts = (req, res) => {
  Product.find({ isVerified: false })
    .select("-photo")
    .populate("category")
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(400).json({
        error: "Error occurred while loading unverified products",
      });
    });
};

exports.adminDeleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, prod) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete ${prod.name}`,
      });
    }
    res.json({
      message: `Deleted ${prod.name} successfully.`,
    });
  });
};

exports.adminApproveProduct = (req, res) => {
  let product = req.product;
  Product.findByIdAndUpdate(product._id, { isVerified: true })
    .then((result) => {
      res.json({
        message: `Approved ${product.name} successfully.`,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: `Failed to approve ${product.name}`,
      });
    });
};
