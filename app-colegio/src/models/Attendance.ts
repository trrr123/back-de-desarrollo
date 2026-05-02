import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Enrollment } from "./Enrollment";
import { Course } from "./Course";

export interface AttendanceI {
  id?: number;
  enrollment_id: number;
  course_id: number;
  attend_date: Date;
  state?: string;
  note?: string;
}

export class Attendance extends Model {
  public id!: number;
  public enrollment_id!: number;
  public course_id!: number;
  public attend_date!: Date;
  public state!: string;
  public note!: string;
}

Attendance.init(
  {
    enrollment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attend_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(10),
      defaultValue: "present",
    },
    note: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Attendance",
    tableName: "attendances",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

// Relaciones
Enrollment.hasMany(Attendance, {
  foreignKey: "enrollment_id",
  sourceKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION"
});
Attendance.belongsTo(Enrollment, {
  foreignKey: "enrollment_id",
  targetKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION"
});

Course.hasMany(Attendance, {
  foreignKey: "course_id",
  sourceKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION"
});
Attendance.belongsTo(Course, {
  foreignKey: "course_id",
  targetKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION"
});