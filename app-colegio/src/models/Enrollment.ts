import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Student } from "./Student";
import { SchoolGroup } from "./SchoolGroup";

export interface EnrollmentI {
  id?: number;
  student_id: number;
  group_id: number;
  enrollment_date: Date;
  subtotal?: number;
  tax?: number;
  total?: number;
  status?: string;
}

export class Enrollment extends Model {
  public id!: number;
  public student_id!: number;
  public group_id!: number;
  public enrollment_date!: Date;
  public subtotal!: number;
  public tax!: number;
  public total!: number;
  public status!: string;
}

Enrollment.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enrollment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00,
    },
    tax: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00,
    },
    total: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "Enrollment",
    tableName: "enrollments",
    timestamps: false,
  }
);

// Relaciones
Student.hasMany(Enrollment, {
  foreignKey: "student_id",
  sourceKey: "id",
});
Enrollment.belongsTo(Student, {
  foreignKey: "student_id",
  targetKey: "id",
});

SchoolGroup.hasMany(Enrollment, {
  foreignKey: "group_id",
  sourceKey: "id",
});
Enrollment.belongsTo(SchoolGroup, {
  foreignKey: "group_id",
  targetKey: "id",
});