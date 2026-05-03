# Actividad 9 - CRUD Colegio Horizonte

En esta actividad se realizó el CRUD completo de todas las tablas del proyecto Colegio Horizonte, utilizando Node.js, TypeScript, Sequelize y MySQL. Se siguió el siguiente orden: creación de modelos, controladores, rutas, prueba de rutas, creación de datos faker y verificación en DBeaver.

---

## 1. Creación de Modelos

Se crearon los modelos de Sequelize para cada tabla de la base de datos. Cada modelo define la estructura de la tabla, los tipos de datos y las relaciones entre tablas.

![student_modelo](./img/student_modelo.png)
![guardian_modelo](./img/guardian_modelo.png)
![schoolgroup_modelo](./img/schoolgroup_modelo.png)
![course_modelo](./img/course_modelo.png)
![enrollments_modelo](./img/enrollments_modelo.png)
![attendances_modelo](./img/attendances_modelo.png)
![grade_modelo](./img/grade_modelo.png)
![tuitionpayments_modelo](./img/tuitionpayments_modelo.png)

---

## 2. Creación de Controladores

Se crearon los controladores para cada modelo. Cada controlador contiene los métodos para realizar las operaciones CRUD: obtener todos, obtener por ID, crear, actualizar, eliminar físicamente y eliminar lógicamente.

![student_control](./img/student_control.png)
![guardin_control](./img/guardin_control.png)
![schoolgroup_control](./img/schoolgroup_control.png)
![course_control](./img/course_control.png)
![enrollments_control](./img/enrollments_control.png)
![attendances_control](./img/attendances_control.png)
![grade_control](./img/grade_control.png)
![tutionpayments_control](./img/tutionpayments_control.png)

---

## 3. Creación de Rutas

Se crearon las rutas para cada modelo. Las rutas definen los endpoints de la API REST y los métodos HTTP que se pueden usar para cada operación.

![student_ruta](./img/student_ruta.png)
![guardian_ruta](./img/guardian_ruta.png)
![schoolgroup_ruta](./img/schoolgroup_ruta.png)
![course_ruta](./img/course_ruta.png)
![enrollments_ruta](./img/enrollments_ruta.png)
![attendances_ruta](./img/attendances_ruta.png)
![grade_ruta](./img/grade_ruta.png)
![tutionpayments_ruta](./img/tutionpayments_ruta.png)

---

## 4. Prueba de Rutas

Una vez creados los modelos, controladores y rutas, se procedió a probar que todas las rutas respondieran correctamente. Se verificó que el servidor levantara sin errores y que cada endpoint retornara los datos esperados.

![prueba_rutas](./img/pruebadelasrutasestanbien.png)
![prueba_rutas_bien](./img/pruebaderutasbien.png)

---

## 5. Creación Faker

Se creó el script de faker para poblar la base de datos con datos de prueba. El script crea registros en todas las tablas respetando las relaciones entre ellas: estudiantes, acudientes, grupos escolares, cursos, matrículas, asistencias, calificaciones y pagos de matrícula.

![creacionfaker](./img/creacionfaker.ts.png)

---

## 6. Prueba Faker Exitosa

Se ejecutó el script de faker y se verificó que todos los datos se insertaran correctamente en la base de datos sin errores.

![pruebafaker_exitosa](./img/pruebafaker_exitosa.png)

---

## 7. Datos Faker en DBeaver

Se verificó en DBeaver que todos los datos faker se insertaron correctamente en cada tabla de la base de datos.

![datosfaker_students](./img/datosfaker_students.png)
![datosfaker_guardian](./img/datosfaker_guardian.png)
![datosfaker_schoolgroups](./img/datosfaker_schoolgroups.png)
![datosfaker_courses](./img/datosfaker_courses.png)
![datosfaker_enrollment](./img/datosfaker_enrollment.png)
![datosfaker_attendances](./img/datosfaker_attendances.png)
![datosfaker_grades](./img/datosfaker_grades.png)
![datosfaker_tution](./img/datosfaker_tution.png)