"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"DiamondSmalls",
			[
				//NATD
				{
					"DiaSmallID": "NATD02",
					"DiaSmallPicture": "http://localhost:5000/image/diamond/kc.png",
					"DiaSmallWeight": 2,
					"DiaSmallUnit": "Ly",
					"DiaSmallOriginID": "NAT",
					"DiaSmallColorID": "D"
				},
				{
					"DiaSmallID": "NATD01",
					"DiaSmallPicture": "http://localhost:5000/image/diamond/kc.png",
					"DiaSmallWeight": 1,
					"DiaSmallUnit": "Ly",
					"DiaSmallOriginID": "NAT",
					"DiaSmallColorID": "D"
				},

				//NATE
				{
					"DiaSmallID": "NATE02",
					"DiaSmallPicture": "http://localhost:5000/image/diamond/kc.png",
					"DiaSmallWeight": 2,
					"DiaSmallUnit": "Ly",
					"DiaSmallOriginID": "NAT",
					"DiaSmallColorID": "E"
				},
				{
					"DiaSmallID": "NATE01",
					"DiaSmallPicture": "http://localhost:5000/image/diamond/kc.png",
					"DiaSmallWeight": 1,
					"DiaSmallUnit": "Ly",
					"DiaSmallOriginID": "NAT",
					"DiaSmallColorID": "E"
				},


				//NATF
				{
					"DiaSmallID": "NATF02",
					"DiaSmallPicture": "http://localhost:5000/image/diamond/kc.png",
					"DiaSmallWeight": 2,
					"DiaSmallUnit": "Ly",
					"DiaSmallOriginID": "NAT",
					"DiaSmallColorID": "F"
				},
				{
					"DiaSmallID": "NATF01",
					"DiaSmallPicture": "http://localhost:5000/image/diamond/kc.png",
					"DiaSmallWeight": 1,
					"DiaSmallUnit": "Ly",
					"DiaSmallOriginID": "NAT",
					"DiaSmallColorID": "F"
				},


				//NATJ
				{
					"DiaSmallID": "NATJ02",
					"DiaSmallPicture": "http://localhost:5000/image/diamond/kc.png",
					"DiaSmallWeight": 2,
					"DiaSmallUnit": "Ly",
					"DiaSmallOriginID": "NAT",
					"DiaSmallColorID": "J"
				},
				{
					"DiaSmallID": "NATJ01",
					"DiaSmallPicture": "http://localhost:5000/image/diamond/kc.png",
					"DiaSmallWeight": 1,
					"DiaSmallUnit": "Ly",
					"DiaSmallOriginID": "NAT",
					"DiaSmallColorID": "J"
				},

			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("DiamondSmalls", null, {});
	},
};
