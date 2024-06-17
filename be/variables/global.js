require("dotenv").config();
const ENV = process.env;

const ACCESS_TOKEN_SECRET = ENV.ACCESS_TOKEN_SECRET;
const NODE_ENV = ENV.NODE_ENV;
const BE_PORT = ENV.BE_PORT;
const FE_ENDPOINT = ENV.FE_ENDPOINT;
const DB_HOST = ENV.DB_HOST;
const DB_USER = ENV.DB_USER;
const DB_PASS = ENV.DB_PASS;
const DB_NAME = ENV.DB_NAME;
const REFRESH_TOKEN_SECRET = ENV.REFRESH_TOKEN_SECRET;

module.exports = {
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
	NODE_ENV,
	BE_PORT,
	FE_ENDPOINT,
	DB_HOST,
	DB_USER,
	DB_PASS,
	DB_NAME,
};
