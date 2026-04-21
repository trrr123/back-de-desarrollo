import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Enrollment } from "./Enrollment";

export interface TuitionPaymentI {
  id?: number;
  enrollment_id: number;
  reference: string;
  method: string;
  amount: number;
  payment_date: Date;
  due_date: Date;
  period_month: number;
  period_year: number;
  status?: string;
}

export class TuitionPayment extends Model {
  public id!: number;
  public enrollment_id!: number;
  public reference!: string;
  public method!: string;
  public amount!: number;
  public payment_date!: Date;
  public due_date!: Date;
  public period_month!: number;
  public period_year!: number;
  public status!: string;
}

TuitionPayment.init(
  {
    enrollment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    period_month: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        min: 1,
        max: 12,
      },
    },
    period_year: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "TuitionPayment",
    tableName: "tuition_payments",
    timestamps: false,
  }
);

// Relación
Enrollment.hasMany(TuitionPayment, {
  foreignKey: "enrollment_id",
  sourceKey: "id",
});
TuitionPayment.belongsTo(Enrollment, {
  foreignKey: "enrollment_id",
  targetKey: "id",
});