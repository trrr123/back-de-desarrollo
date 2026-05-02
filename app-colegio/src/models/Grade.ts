import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Enrollment } from "./Enrollment";
import { Course } from "./Course";

export interface GradeI {
  id?: number;
  enrollment_id: number;
  course_id: number;
  period: string;
  score: number;
  comments?: string;
  status?: string;
}

export class Grade extends Model {
  public id!: number;
  public enrollment_id!: number;
  public course_id!: number;
  public period!: string;
  public score!: number;
  public comments!: string;
  public status!: string;
}

Grade.init(
  {
    enrollment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    period: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      },
    },
    comments: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "draft",
    },
  },
  {
       sequelize,
    modelName: "Grade",
    tableName: "grades",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Relaciones
Enrollment.hasMany(Grade, {
  foreignKey: "enrollment_id",
  sourceKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION"
});
Grade.belongsTo(Enrollment, {
  foreignKey: "enrollment_id",
  targetKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION"
});

Course.hasMany(Grade, {
  foreignKey: "course_id",
  sourceKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION"
});
Grade.belongsTo(Course, {
  foreignKey: "course_id",
  targetKey: "id",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION"
});