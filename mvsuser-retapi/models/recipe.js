const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const BookAuthor = sequelize.define('bookauthor', {
    FoodId: {  // Изменено название столбца
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'food',
            key: 'id'
        }
    },
    ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'products',
            key: 'id'
        }
    }
}, {
    tableName: 'recipe',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "FoodId" },  
                { name: "ProductId" },
            ]
        },
    ]
});

module.exports = BookAuthor;
