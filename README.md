# -DANILO_AYALA_Prueba_semi_senior_.NET
Aplicación To-Do List desarrollada con Angular 17 y .NET 9, que permite gestionar tareas con autenticación JWT. Los usuarios pueden crear, editar, eliminar y marcar tareas como completadas. Incluye métricas dinámicas, interfaz moderna con Angular Material y diseño responsive orientado a productividad.

# 🧾 To-Do List App — Angular 17 + .NET 9 (Full Stack)

Proyecto desarrollado como prueba técnica para el cargo **Desarrollador Semi Senior**, utilizando **Angular 17** en el frontend y **ASP.NET Core 9** en el backend.

---

## 🚀 Objetivo
Evaluar las habilidades técnicas para el desarrollo full-stack con Angular y .NET 9, aplicando buenas prácticas de arquitectura, consumo de APIs, autenticación JWT y manejo de estado.

---

## 🧠 Descripción del Proyecto
Aplicación tipo **To-Do List** que permite gestionar tareas con autenticación de usuario.  
Los usuarios pueden **crear, editar, eliminar y marcar tareas como completadas**, además de visualizar **métricas** de estado general.

### 🔹 Funcionalidades principales
- **Inicio de sesión** con autenticación basada en **JWT** (JSON Web Tokens).  
- **Gestión de tareas**:  
  - Crear nuevas tareas.  
  - Editar tareas existentes.  
  - Eliminar tareas.  
  - Marcar tareas como completadas o pendientes.  
- **Dashboard** con métricas en tiempo real:  
  - Total de tareas.  
  - Tareas completadas.  
  - Tareas pendientes.  
- **Notificaciones** visuales al crear tareas exitosamente.  
- **Filtrado dinámico** por estado (todas, completadas, pendientes).  
- Diseño **responsive** con Angular Material.

---

## 🧩 Tecnologías utilizadas

### 🖥️ Frontend (Angular 17)
- Angular CLI  
- Angular Material  
- RxJS  
- TypeScript  
- HTML / CSS  
- JWT Client Interceptor  

### ⚙️ Backend (.NET 9)
- ASP.NET Core Web API  
- Entity Framework Core  
- Autenticación JWT  
- C# 12  
- SQL Server / In-Memory DB  

---

## 🏗️ Arquitectura del proyecto

📦 WebAPI (Backend)
┣ 📂 Controllers
┃ ┣ 📜 AccesoController.cs → Login, Registro, Validar Token
┃ ┗ 📜 ProductoController.cs → CRUD de tareas
┣ 📂 Models
┃ ┣ 📜 Usuario.cs
┃ ┗ 📜 Producto.cs
┣ 📂 Custom
┃ ┗ 📜 Utilidades.cs (Encriptar SHA256, Generar JWT)
┗ 📜 DbpruebaContext.cs

📦 Frontend (Angular)
┣ 📂 src/app
┃ ┣ 📂 components/inicio
┃ ┃ ┣ 📜 inicio.component.ts
┃ ┃ ┣ 📜 inicio.component.html
┃ ┃ ┗ 📜 inicio.component.css
┃ ┣ 📂 producto-dialog
┃ ┃ ┣ 📜 producto-dialog.component.ts
┃ ┃ ┣ 📜 producto-dialog.component.html
┃ ┃ ┗ 📜 producto-dialog.component.css
┣ 📂 services
┃ ┗ 📜 producto.service.ts
┣ 📂 interfaces
┃ ┗ 📜 Producto.ts
┗ 📜 app.routes.ts

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- [Node.js 18 +](https://nodejs.org/)  
- [Angular CLI 17 +](https://angular.io/cli)  
- [.NET SDK 9.0](https://dotnet.microsoft.com/)  
- [SQL Server o LocalDB]  

---

## ▶️ Ejecución del proyecto

### 🔸 1. Clonar el repositorio
bash
git clone https://github.com/tuusuario/ToDoList-Angular-Net9.git
cd ToDoList-Angular-Net9

2. Backend (.NET 9)
Por defecto, la API se ejecuta en:
http://localhost:5160
Variables importantes (en appsettings.json)
"Jwt": {
  "key": "F8096D98-03DA-4911-B296-5E6A55ECF058"
}
Endpoints principales
Método	Ruta	Descripción
POST	/api/Acceso/Registrarse	Registro de nuevo usuario
POST	/api/Acceso/Login	Inicia sesión y devuelve token JWT
GET	/api/Acceso/ValidarToken	Verifica validez del token
GET	/api/Producto/Lista	Obtiene todas las tareas
POST	/api/Producto/Crear	Crea una nueva tarea
PUT	/api/Producto/Editar/{id}	Edita una tarea existente
DELETE	/api/Producto/Eliminar/{id}	Elimina una tarea

💬 Notificaciones

Al crear una tarea, se muestra una notificación “Tarea creada correctamente” usando MatSnackBar.

Métricas mostradas

Total de tareas

Tareas completadas

Tareas pendientes

Estas se recalculan automáticamente al crear, editar o eliminar tareas.

Autor

DANILO ALEXANDER AYALA BURGOS
📧 dexter2818@hotmail.com
