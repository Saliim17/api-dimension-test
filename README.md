# API DIMENSION 2022
Esta API será utilizada por la asociación Core Dumped y probablemente por las demás participantes de Dimension 2022. La API permite el registro e identificación de usuarios, que tendrán asociados puntos por participar en eventos. Con dichos puntos podrán comprar objetos. Esta api se encarga de registrar todos los datos.

El proyecto está construido con MongoDB y NodeJS.
## Modelo de datos
### Usuarios.
De momento, los usuarios de la API son sencillos. Tienen los siguientes campos:
- name: Nombre de usuario. Es único.
- email: También es único. Actúa como id.
- imageProfile: Imagen de perfil o avatar del usuario alojada en otro servidor.
- password: se usa para la autentificación del usuario. Este campo no se muestra por motivos de seguridad.
- signUpDate: fecha de creación de la cuenta.
- earnings_history: Es un array que tiene los siguientes elementos:
  - id_activity: id de la actividad en la que se ha conseguido la ganancia de puntos.
  - coin: Moneda. Puede haber varias - corepuntos, puntos de dimension... Predeterminado "Corepuntos" (*)
  - points: Indica cuanto se ha ganado.
  - dateObtaining: Registra cuando se ha creado la ganancia. Automático.
- expenses_history: Es un array que contiene los siguientes elementos:
  - id_item: id del objeto que se ha comprado.
  - coin: Predeterminado "Corepuntos" (*)
  - points: Indica cuanto se ha gastado.
  - dateObtaining: Registra cuando se ha creado el gasto. Automático.
### Actividades
- id: Es único e inmutable.
- name: Nombre de la actividad.
- description: Descripcion de la actividad. Opcional.
- picture: Opcional - url a una imagen alojada en otro servidor.
- coin: Predeterminado "Corepuntos". (*)
- defaultPoints: Predeterminados = 20.
### Objetos
- id: único e inmutable.
- name: nombre del objeto.
- description: es opcional.
- price: precio del objeto.
- coinType (*)
- picture. Opcional
- stock - ¿Cuántos quedan?
- canBeBoughtMultipleTimes - ¿Ha comprado el usuario ya el objeto?
## Middleware
### Token de expiración
- [x] Crear token con tiempo de expiración.
- [x] Verificación del token por su expiración.  
## Rutas
A continuación, se muestra una lista de las funcionalidades de la API.
### Usuario
Funcionalidades implementadas:
- [x] Get de usuarios (GET /api/users)
- [x] Get de usuario concreto por email (GET /api/users/email/:EMAIL)
- [x] Creación de usuarios (POST /api/users). El body de la petición incluye el usuario.
- [x] Actualización de usuario por email (PUT /api/users/:userId). El body de la petición incluye los cambios del usuario con el email que se ha introducido por parámetro.
- [x] Borrado de usuario concreto por email (DELETE /api/users/:userId)
- [x] Apuntar participación de usuario en actividad (POST /api/users/participation/:userId). El body de la petición incluye un campo "activity", que representa la id de la actividad que se quiere apuntar al usuario. Si se le incluye asdemás el campo "points", se podrá específicar los puntos que dará la participación. Si no, serán los puntos predeterminados de la actividad.
- [x] Cálculo de las monedas que tiene un usuario (GET /api/users/currency/:CURRENCY/:userId). 
- [X] Permitir la compra de un objeto por parte de un usuario. Similar a la participación del usuario en la actividad.
- [X] Ruta de login de usuario.
- [X] Ruta de registro de usuario. 
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
### Token de expiración
- [x] Get de la verififación del token.
## Anotaciones
(*) = A la espera de confirmación para crear varios tipos de moneda.
