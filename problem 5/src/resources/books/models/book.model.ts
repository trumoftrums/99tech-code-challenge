import { DataTypes, Model, Optional } from "sequelize";
import  sequelize from "../../../util/database";

export interface BookAttributes {
    id: number;
    title: string;
    author: string;
    publishedYear: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Some fields are optional when creating
export interface BookCreationAttributes extends Optional<BookAttributes, "id"> { }

export class Book
    extends Model<BookAttributes, BookCreationAttributes>
    implements BookAttributes {
    public id!: number;
    public title!: string;
    public author!: string;
    public publishedYear!: number;
    public description!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publishedYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "books",
        timestamps: true,
    }
);
