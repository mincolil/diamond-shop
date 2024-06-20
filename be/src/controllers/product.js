const { Products } = require("../../models");

// Create a new Products
exports.create = async (req, res) => {
	try {
		const product = await Products.create(req.body);
		res.status(201).json(product);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all Products
exports.findAll = async (req, res) => {
	try {
		const product = await Products.findAll();
		res.json(product);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single Products by ID
exports.findOne = async (req, res) => {
	try {
		const product = await Products.findByPk(req.params.id);
		if (product) {
			res.json(product);
		} else {
			res.status(404).json({ error: "Products not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a Products by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await Products.update(req.body, {
			where: { ProductID: req.params.id },
		});
		if (updated) {
			const updatedProduct = await Products.findByPk(req.params.id);
			res.json(updatedProduct);
		} else {
			const existingProduct = await Products.findByPk(req.params.id);
			res.json(existingProduct); // Return the existing customer data if no update occurred
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a Products by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await Products.destroy({
			where: { ProductID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "Products not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
