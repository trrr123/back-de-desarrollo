import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Student } from "./Student";

export interface GuardianI {
  id?: number;
  student_id: number;
  doc_type: string;
  doc_number: string;
  first_name: string;
  last_name: string;
  phone?: string;
  email?: string;
  relationship: string;
  status?: string;
}

export class Guardian extends Model {
  public id!: number;
  public student_id!: number;
  public doc_type!: string;
  public doc_number!: string;
  public first_name!: string;
  public last_name!: string;
  public phone!: string;
  public email!: string;
  public relationship!: string;
  public status!: string;
}

Guardian.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doc_type: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    doc_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    relationship: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "Guardian",
    tableName: "guardians",
    timestamps: false,
  }
);

// Relación: Student tiene muchos Guardians
Student.hasMany(Guardian, {
  foreignKey: "student_id",
  sourceKey: "id",
});
Guardian.belongsTo(Student, {
  foreignKey: "student_id",
  targetKey: "id",
});