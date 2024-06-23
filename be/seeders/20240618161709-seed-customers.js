"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Customers",
			[
				{
					CustomerID: 1,
					CusPhone: "0901234567",
					CusName: "Nguyễn Văn A",
					CusPoint: 100,
					CusPassword: "hashedpassword",
					CusUsername: "nguyenvana",
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Customers", null, {});
	},
};
