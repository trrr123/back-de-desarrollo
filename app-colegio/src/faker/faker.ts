import { faker } from "@faker-js/faker/locale/es";

import { sequelize } from "../database/db";

import { Student } from "../models/Student";
import { Guardian } from "../models/Guardian";
import { SchoolGroup } from "../models/SchoolGroup";
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";
import { Attendance } from "../models/Attendance";
import { Grade } from "../models/Grade";
import { TuitionPayment } from "../models/TuitionPayment";

const pick = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const range = (n: number) =>
  Array.from({ length: n }, (_, i) => i);

const DOC_TYPES = ["CC", "TI", "CE", "PP"];
const RELATIONSHIPS = ["Padre", "Madre", "Abuelo", "Abuela", "Tío", "Hermano"];
const METHODS = ["Efectivo", "Tarjeta", "Transferencia", "PSE"];
const STATES = ["present", "absent", "late"];
const PERIODS = ["P1", "P2", "P3", "P4"];

const GRADES_LIST = [
  "1°", "2°", "3°", "4°", "5°",
  "6°", "7°", "8°", "9°", "10°", "11°"
];

const SUBJECTS = [
  "Matemáticas",
  "Español",
  "Ciencias Naturales",
  "Historia",
  "Educación Física",
  "Inglés",
  "Artes",
  "Informática",
];

async function createFakeData() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a MySQL");

    // ─────────────────────────────────────────────
    // 🔥 LIMPIEZA SEGURA (EVITA DUPLICADOS)
    // ─────────────────────────────────────────────
    await Attendance.destroy({ where: {} });
    await Grade.destroy({ where: {} });
    await TuitionPayment.destroy({ where: {} });
    await Enrollment.destroy({ where: {} });
    await Course.destroy({ where: {} });
    await SchoolGroup.destroy({ where: {} });
    await Guardian.destroy({ where: {} });
    await Student.destroy({ where: {} });

    // ─── Students ───────────────────────────────
    const students = await Student.bulkCreate(
      range(8).map(() => ({
        doc_type: pick(DOC_TYPES),
        doc_number: faker.string.numeric(10),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone: `3${faker.string.numeric(9)}`,
        email: faker.internet.email(),
        status: "active",
      }))
    );

    console.log(`👤 ${students.length} estudiantes creados`);

    // ─── Guardians ──────────────────────────────
    const guardians = await Guardian.bulkCreate(
      students.map((student: any) => ({
        student_id: student.id,
        doc_type: pick(DOC_TYPES),
        doc_number: faker.string.numeric(10),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone: `3${faker.string.numeric(9)}`,
        email: faker.internet.email(),
        relationship: pick(RELATIONSHIPS),
        status: "active",
      }))
    );

    console.log(`👨‍👩‍👧 ${guardians.length} acudientes creados`);

    // ─── Groups ─────────────────────────────────
    const groups = await SchoolGroup.bulkCreate(
      range(5).map((i) => ({
        name: `Grupo ${String.fromCharCode(65 + i)}`,
        grade: pick(GRADES_LIST),
        period: "2025",
        status: "active",
      })),
      {
        ignoreDuplicates: true, // 🔥 FIX IMPORTANTE
      }
    );

    console.log(`🏫 ${groups.length} grupos creados`);

    // ─── Courses ────────────────────────────────
    const courses = await Course.bulkCreate(
      groups.flatMap((group: any) =>
        range(2).map(() => ({
          name: pick(SUBJECTS),
          description: faker.lorem.sentence(),
          teacher: `${faker.person.firstName()} ${faker.person.lastName()}`,
          group_id: group.id,
          status: "active",
        }))
      )
    );

    console.log(`📚 ${courses.length} cursos creados`);

    // ─── Enrollments ────────────────────────────
    const subtotal = 800000;
    const tax = subtotal * 0.19;
    const total = subtotal + tax;

    const enrollments = await Enrollment.bulkCreate(
      students.map((student: any) => ({
        student_id: student.id,
        group_id: pick(groups as any[]).id,
        enrollment_date: faker.date
          .between({
            from: "2025-01-15",
            to: "2025-02-28",
          })
          .toISOString()
          .slice(0, 10),
        subtotal,
        tax,
        total,
        status: "active",
      }))
    );

    console.log(`📋 ${enrollments.length} matrículas creadas`);

    // ─── Attendances ────────────────────────────
    const attendances = await Attendance.bulkCreate(
      enrollments.flatMap((enrollment: any) => {
        const groupCourses = courses.filter(
          (course: any) => course.group_id === enrollment.group_id
        );

        return range(3).map(() => {
          const course = pick(groupCourses);

          return {
            enrollment_id: enrollment.id,
            course_id: course.id,
            attend_date: faker.date
              .between({
                from: "2025-02-01",
                to: "2025-04-30",
              })
              .toISOString()
              .slice(0, 10),
            state: pick(STATES),
            note: faker.datatype.boolean()
              ? faker.lorem.words(4)
              : null,
          };
        });
      })
    );

    console.log(`✋ ${attendances.length} asistencias creadas`);

    // ─── Grades ─────────────────────────────────
    const grades = await Grade.bulkCreate(
      enrollments.flatMap((enrollment: any) => {
        const groupCourses = courses.filter(
          (course: any) => course.group_id === enrollment.group_id
        );

        const course = pick(groupCourses);

        const selectedPeriods = faker.helpers
          .shuffle([...PERIODS])
          .slice(0, 2);

        return selectedPeriods.map((period) => ({
          enrollment_id: enrollment.id,
          course_id: course.id,
          period,
          score: parseFloat((Math.random() * 4 + 6).toFixed(2)),
          comments: faker.datatype.boolean()
            ? faker.lorem.sentence()
            : null,
          status: "published",
        }));
      })
    );

    console.log(`📝 ${grades.length} calificaciones creadas`);

    // ─── Payments ───────────────────────────────
    const payments = await TuitionPayment.bulkCreate(
      enrollments.map((enrollment: any) => {
        const payDate = faker.date.between({
          from: "2025-02-01",
          to: "2025-03-31",
        });

        const dueDate = new Date(payDate);
        dueDate.setDate(dueDate.getDate() + 30);

        return {
          enrollment_id: enrollment.id,
          reference: faker.string.alphanumeric(12).toUpperCase(),
          method: pick(METHODS),
          amount: total,
          payment_date: payDate.toISOString().slice(0, 10),
          due_date: dueDate.toISOString().slice(0, 10),
          period_month: payDate.getMonth() + 1,
          period_year: payDate.getFullYear(),
          status: "paid",
        };
      })
    );

    console.log(`💰 ${payments.length} pagos creados`);

    console.log("🎉 Datos falsos insertados correctamente");
  } catch (error) {
    console.error("❌ Error al insertar datos:", error);
  } finally {
    await sequelize.close();
  }
}

createFakeData();