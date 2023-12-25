const Product = require("../models/products");

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const product = {
        name: req.body.name,
    };

    Product.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};

exports.findAll = (req, res) => {
    Product.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};

exports.update = (req, res) => {
    const productId = req.params.id;

    if (!productId) {
        res.status(400).send({
            message: "Product ID is required."
        });
        return;
    }

    Product.findByPk(productId)
        .then(product => {
            if (!product) {
                res.status(404).send({
                    message: `Product with ID ${productId} not found.`
                });
            } else {
                product.name = req.body.name || product.name;

                product.save()
                    .then(() => {
                        res.send({
                            message: `Product with ID ${productId} has been updated successfully.`
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while updating the product."
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};

exports.delete = (req, res) => {
    const productId = req.params.id;

    if (!productId) {
        res.status(400).send({
            message: "Product ID is required."
        });
        return;
    }

    Product.findByPk(productId)
        .then(product => {
            if (!product) {
                res.status(404).send({
                    message: `Product with ID ${productId} not found.`
                });
            } else {
                product.destroy()
                    .then(() => {
                        res.send({
                            message: `Product with ID ${productId} has been deleted successfully.`
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while deleting the product."
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
};
