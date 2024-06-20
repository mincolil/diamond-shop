const { Customers } = require("../../models");
const { omitPassword } = require("../helper/user");
const { generateToken } = require("../middleware/auth");

// Create a new Customers
exports.create = async (req, res) => {
	try {
		const customer = await Customers.create(req.body);
		res.status(201).json(customer);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const customer = await Customers.findOne({ where: { CusUsername: username } });
		if (customer.CusPassword === password) {
			let userData = omitPassword(customer)
			const token = generateToken(userData);
			userData.token = token;
			res.status(200).json(userData);
		} else {
			res.status(401).json({ message: "Invalid username or password" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all Customers
exports.findAll = async (req, res) => {
	try {
		const customer = await Customers.findAll();
		res.json(customer);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get a single Customers by ID
exports.findOne = async (req, res) => {
	try {
		const customer = await Customers.findByPk(req.params.id);
		if (customer) {
			res.json(customer);
		} else {
			res.status(404).json({ error: "Customers not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update a Customers by ID
exports.update = async (req, res) => {
	try {
		const [updated] = await Customers.update(req.body, {
			where: { CustomerID: req.params.id },
		});
		if (updated > 0) {
			const updatedCustomer = await Customers.findByPk(req.params.id);
			res.json(updatedCustomer);
		} else {
			const existingCustomer = await Customers.findByPk(req.params.id);
			res.json(existingCustomer); // Return the existing customer data if no update occurred
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Delete a Customers by ID
exports.delete = async (req, res) => {
	try {
		const deleted = await Customers.destroy({
			where: { CustomerID: req.params.id },
		});
		if (deleted) {
			res.status(204).json();
		} else {
			res.status(404).json({ error: "Customers not found" });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
