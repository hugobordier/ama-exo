import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Recipe extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public ingredients!: string;
    public instruction!: string;
    public imageUrl?: string; // Déclaration de la propriété photo comme un Buffer
}

Recipe.init(
    {
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
        tableName: 'recipes',
        sequelize,
        timestamps: true
    }
);

export default Recipe;
