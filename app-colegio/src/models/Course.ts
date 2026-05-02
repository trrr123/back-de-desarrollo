import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { SchoolGroup } from "./SchoolGroup";

export interface CourseI {
  id?: number;
  name: string;
  description?: string;
  teacher: string;
  group_id: number;
  status?: string;
}

export class Course extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public teacher!: string;
  public group_id!: number;
  public status!: string;
}

Course.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    teacher: {
      type: DataTypes.STRING(160),
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "Course",
    tableName: "courses",
    timestamps: false,
  }
);

SchoolGroup.hasMany(Course, {
  foreignKey: "group_id",
  sourceKey: "id",
  constraints: false,
});
Course.belongsTo(SchoolGroup, {
  foreignKey: "group_id",
  targetKey: "id",
  constraints: false,
});