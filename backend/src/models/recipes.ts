import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

// Define the Recipe model
class Recipe extends Model {
    // Declare properties for Recipe model
    public id!: number;
    public name!: string;
    public description!: string;
    public ingredients!: string;
    public instruction!: string;
    public imageUrl?: string;
}

// Initialize Recipe model with Sequelize
Recipe.init(
    {
        // Define model attributes
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(256),
            allowNull: false,
        },
        ingredients: {
            type: new DataTypes.STRING(256),
            allowNull: false,
        },
        instruction: {
            type: new DataTypes.STRING(256),
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        // Define model options
        tableName: 'recipes', // Set table name
        sequelize, // Pass the Sequelize instance
        timestamps: true // Enable timestamps
    }
);

export default Recipe;
