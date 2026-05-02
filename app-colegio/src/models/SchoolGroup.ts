import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface SchoolGroupI {
  id?: number;
  name: string;
  grade: string;
  period: string;
  status?: string;
}

export class SchoolGroup extends Model {
  public id!: number;
  public name!: string;
  public grade!: string;
  public period!: string;
  public status!: string;
}

SchoolGroup.init(
  {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    period: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "SchoolGroup",
    tableName: "school_groups",
    timestamps: false,
  }
);