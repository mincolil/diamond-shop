"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Diamonds",
			[
				{
					"DiamondID": "NATDFL03",
					"GIAPicture": "https://caohungdiamond.com/wp-content/uploads/2023/06/bang-gia-kim-cuong-xac-nhan-GIA.jpg",
					"GIAID": "GIA001",
					"DiaPicture": "picture",
					"DiaOriginID": "NAT",
					"DiaWeight": 3,
					"DiaUnit": "Ly",
					"DiaColorID": "D",
					"DiaClarityID": "FL",
					"DiaCut": "round"
				},
				{
					"DiamondID": "NATFVS203",
					"GIAPicture": "https://caohungdiamond.com/wp-content/uploads/2023/06/bang-gia-kim-cuong-xac-nhan-GIA.jpg",
					"GIAID": "GIA003",
					"DiaPicture": "picture",
					"DiaOriginID": "NAT",
					"DiaWeight": 3,
					"DiaUnit": "Ly",
					"DiaColorID": "F",
					"DiaClarityID": "VS2",
					"DiaCut": "Round"
				},
				{
					"DiamondID": "NATFVVS104",
					"GIAPicture": "https://caohungdiamond.com/wp-content/uploads/2023/06/bang-gia-kim-cuong-xac-nhan-GIA.jpg",
					"GIAID": "GIA004",
					"DiaPicture": "picture",
					"DiaOriginID": "NAT",
					"DiaWeight": 4,
					"DiaUnit": "Ly",
					"DiaColorID": "F",
					"DiaClarityID": "VVS1",
					"DiaCut": "Oval"
				},
				{
					"DiamondID": "NATGVVS201",
					"GIAPicture": "https://caohungdiamond.com/wp-content/uploads/2023/06/bang-gia-kim-cuong-xac-nhan-GIA.jpg",
					"GIAID": "GIA005",
					"DiaPicture": "picture",
					"DiaOriginID": "NAT",
					"DiaWeight": 1,
					"DiaUnit": "Ly",
					"DiaColorID": "G",
					"DiaClarityID": "VVS2",
					"DiaCut": "Heart"
				}
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Diamonds", null, {});
	},
};
