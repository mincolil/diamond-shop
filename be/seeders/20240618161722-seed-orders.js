"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Orders",
			[
				{
					"OrderID": "ORD001",
					"SaleDate": "2024-06-20",
					"CusPhone": "0823667838",
					"CusName": "du le minh",
					"CusAddress": "04 ngõ 67 Chu Văn An",
					"TotalDetailPrice": "19500000.00",
					"DiscountPrice": "1950000.00",
					"TotalPrice": "17550000.00",
					"ShipPrice": "50000.00",
					"Currency": "VND",
					"BonusPointID": 2,
					"OrderPoint": 20,
					"PromotionID": "PRO001",
					"CustomerID": 2,
					"EmployeeIDShip": "EMP005",
					"OrdNote": "tẻg",
					"OrdStatus": 3,
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Orders", null, {});
	},
};
