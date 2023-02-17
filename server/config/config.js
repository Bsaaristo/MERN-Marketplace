const TABLE_NAME = 'Frshly';
const config = {
    PORT: process.env.PORT || 5000,
    //DB_CONNECTION: `mongodb://localhost/${TABLE_NAME}`,
    DB_CONNECTION: `mongodb+srv://Frshly:RnMnM0JtRJhnnz5B@cluster0.waf71ef.mongodb.net/test`,
    SECRET: 'badumts',
    SALT: 10,
    COOKIE_NAME: 'USER_SESSION',
    CLOUDINARY_NAME: "dbrs4se5g",
    CLOUDINARY_API_KEY: "844747666541265",
    CLOUDINARY_API_SECRET: "c-XdtyK_mC-bomU-bBQdTFgmrT8",
    //CLOUDINARY_STORAGE: 'pza5zln6'
}

module.exports = config;