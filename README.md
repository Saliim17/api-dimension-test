# API DIMENSION 2022
Esta API será utilizada por la asociación Core Dumped y probablemente por las demás participantes de Dimension 2022. La API permite el registro e identificación de usuarios, que tendrán asociados puntos por participar en eventos. Con dichos puntos podrán comprar objetos. Esta api se encarga de registrar todos los datos.

El proyecto está construido con MongoDB y NodeJS.
## Modelo de datos
### Usuarios.
De momento, los usuarios de la API son sencillos. Tienen los siguientes campos:
- name: Nombre de usuario. Es único.
- correo: También es único. Actúa como id.
- historial_ganancias: Es un array que tiene los siguientes elementos:
  - id_actividad: id de la actividad en la que se ha conseguido la ganancia de puntos.
  - moneda: Moneda. Puede haber varias - corepuntos, puntos de dimension... Predeterminado "Corepuntos" (*)
  - puntos: Indica cuanto se ha ganado.
  - fecha_obtencion: Registra cuando se ha creado la ganancia. Automático.
-  historial_gastos: Es un array que contiene los siguientes elementos:
  - id_objeto: id del objeto que se ha comprado.
  - moneda. Predeterminado "Corepuntos" (*)
  - puntos
  - fecha_obetencion. Automático.
### Actividades
- id. Es único e inmutable.
- name
- descripcion. Opcional.
- imagen. Opcional - url a una imagen alojada en otro servidor.
- moneda. Predeterminado "Corepuntos". (*)
- puntosPorDefecto. Predeterminados 20.
### Objetos
- id
- name
- descripcion. Opcional
- precio
- Tipo de moneda (*)
- imagen. Opcional
- stock - ¿Cuántos quedan?
## Rutas
A continuación, se muestra una lista de las funcionalidades de la API.
### Usuario
Funcionalidades implementadas:
- [x] Get de usuarios (GET /api/users)
- [x] Get de usuario concreto por email (GET /api/users/email/:EMAIL)
- [x] Creación de usuarios (POST /api/users). El body de la petición incluye el usuario.
- [x] Actualización de usuarios (PUT /api/users/:EMAIL). El body de la petición incluye los cambios del usuario con el email que se ha introducido por parámetro.
- [x] Borrado de usuarios (DELETE /api/users/:EMAIL)
- [x] Apuntar participación de usuario en actividad (POST /api/users/participacion/:EMAIL). El body de la petición incluye un campo "activity", que representa la id de la actividad que se quiere apuntar al usuario. Si se le incluye asdemás el campo "puntos", se podrá específicar los puntos que dará la participación. Si no, serán los puntos predeterminados de la actividad.
- [x] Cálculo de las monedas que tiene un usuario (GET /api/users/currency/:CURRENCY/:EMAIL). 
- [ ] Permitir la compra de un objeto por parte de un usuario. Similar a la participación del usuario en la actividad.
- [ ] Ruta de login de usuario.
- [ ] Ruta de registro de usuario.
### Actividad
- [x] Get de actividad (GET /api/activities)
- [x] Get de actividad concreta por id (GET /api/activities/:ID)
- [x] Creación de actividades (POST /api/activities). El body de la petición incluye el usuario.
- [x] Actualización de actividades (PUT /api/activities/:ID). El body de la petición incluye los cambios de la actividad con el id que se ha introducido por parámetro.
- [x] Borrado de actividades (DELETE /api/activities/:ID)
### Objetos
- [x] Get de objeto.
- [x] Get de objeto concreto.
- [x] Creación de objetos.
- [x] Actualización de objetos.
- [x] Borrado de objetos.
## Servicios
### Usuarios
- [ ] getBalance(userId) = devuelve el saldo del usuario pasado por parámetro suando su ID.
### Objetos
- [X] checkItemStock(itemId) = devuelve el stock del objeto pasado por parámetro usando su ID.
### 
## Anotaciones
(*) = A la espera de confirmación para crear varios tipos de moneda.
