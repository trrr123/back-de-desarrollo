import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import { sequelize, testConnection, getDatabaseInfo } from "../database/db";
var cors = require("cors");

import studentRoutes from "../routes/student.routes";
import guardianRoutes from "../routes/guardian.routes";
import schoolGroupRoutes from "../routes/schoolGroup.routes";
import enrollmentRoutes from "../routes/enrollment.routes";
import courseRoutes from "../routes/course.routes";
import attendanceRoutes from "../routes/attendance.routes";
import gradeRoutes from "../routes/grade.routes";
import tuitionPaymentRoutes from "../routes/tuitionPayment.routes";
import { AuthRoutes } from "../routes/authorization/auth.routes";

import "../models/Student";
import "../models/Guardian";
import "../models/SchoolGroup";
import "../models/Enrollment";
import "../models/Course";
import "../models/Attendance";
import "../models/Grade";
import "../models/TuitionPayment";
import "../models/authorization/user";

dotenv.config();

export class App {
  public app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings(): void {
    this.app.set('port', this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use("/api/students", studentRoutes);
    this.app.use("/api/guardians", guardianRoutes);
    this.app.use("/api/school-groups", schoolGroupRoutes);
    this.app.use("/api/enrollments", enrollmentRoutes);
    this.app.use("/api/courses", courseRoutes);
    this.app.use("/api/attendances", attendanceRoutes);
    this.app.use("/api/grades", gradeRoutes);
    this.app.use("/api/tuition-payments", tuitionPaymentRoutes);
    new AuthRoutes().routes(this.app);
  }

  private async dbConnection(): Promise<void> {
    try {
      const dbInfo = getDatabaseInfo();
      console.log(`🔗 Conectando a: ${dbInfo.engine.toUpperCase()}`);
      const isConnected = await testConnection();
      if (!isConnected) {
        throw new Error(`No se pudo conectar a ${dbInfo.engine.toUpperCase()}`);
      }
      await sequelize.sync({ force: false, alter: false });
      console.log(`📦 Base de datos sincronizada exitosamente`);
    } catch (error) {
      console.error("❌ Error al conectar con la base de datos:", error);
      process.exit(1);
    }
  }

  async listen() {
    await this.dbConnection();
    await this.app.listen(this.app.get('port'));
    console.log(`🚀 Servidor ejecutándose en puerto ${this.app.get('port')}`);
  }
}
