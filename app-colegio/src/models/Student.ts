import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface StudentI {
  id?: number;
  doc_type: string;
  doc_number: string;
  first_name: string;
  last_name: string;
  phone?: string;
  email?: string;
  status: "active" | "inactive";
}

export class Student extends Model<StudentI> implements StudentI {
  public id!: number;
  public doc_type!: string;
  public doc_number!: string;
  public first_name!: string;
  public last_name!: string;
  public phone!: string;
  public email!: string;
  public status!: "active" | "inactive";
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    doc_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doc_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "students",
    timestamps: false,
  }
);