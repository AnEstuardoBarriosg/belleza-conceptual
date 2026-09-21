# Belleza Conceptual - DEVOPS 1

Repositorio correspondiente a la implementación DEVOPS 1 de la tienda en línea de Belleza Conceptual.

El proyecto utiliza una arquitectura basada en servicios contenerizados mediante Docker. PostgreSQL se utiliza como base de datos principal y Redis como servicio de caché. Para la planificación, control de versiones, integración continua y gestión de pruebas se utilizan herramientas de Git y Azure DevOps.

## Componentes

La solución está compuesta por los siguientes servicios:

- `auth-service`: gestión de usuarios y roles.
- `catalog-service`: catálogo de productos e inventario.
- `orders-service`: gestión de pedidos y seguimiento.
- `payments-service`: consulta y gestión de pagos.
- PostgreSQL: base de datos principal del sistema.
- Redis: servicio utilizado para almacenamiento temporal y caché.

## Tecnologías

- Node.js
- Express
- PostgreSQL
- Redis
- Docker
- Docker Compose
- Git
- GitHub
- Azure DevOps

## Estructura del proyecto

```text
belleza-conceptual/
├── database/
├── docker/
├── docs/
├── src/
│   ├── auth-service/
│   ├── catalog-service/
│   ├── orders-service/
│   └── payments-service/
├── tests/
├── .env.example
├── .gitattributes
├── .gitignore
├── azure-pipelines.yml
├── docker-compose.yml
└── README.md
```

## Requisitos

Para ejecutar el proyecto localmente se requiere:

- Git
- Docker Desktop
- Docker Compose

## Configuración inicial

Clonar el repositorio y ubicarse en la carpeta principal del proyecto.

Crear el archivo local de variables de entorno a partir de `.env.example`.

En PowerShell:

```powershell
Copy-Item .env.example .env
```

En Linux o macOS:

```bash
cp .env.example .env
```

Posteriormente, editar el archivo `.env` y configurar las variables necesarias para el entorno local.

El archivo `.env` no se encuentra versionado dentro del repositorio para evitar almacenar contraseñas u otras configuraciones sensibles.

## Iniciar el entorno

Para construir e iniciar los contenedores:

```powershell
docker compose up --build -d
```

Para comprobar el estado de los servicios:

```powershell
docker compose ps
```

## Servicios

| Servicio | Puerto externo | Verificación |
|---|---:|---|
| Auth Service | 3001 | `http://localhost:3001/health` |
| Catalog Service | 3002 | `http://localhost:3002/health` |
| Orders Service | 3003 | `http://localhost:3003/health` |
| Payments Service | 3004 | `http://localhost:3004/health` |
| PostgreSQL | 55432 | Base de datos `belleza_conceptual` |
| Redis | 6379 | Servicio Redis |

## Configuración de PostgreSQL

PostgreSQL utiliza internamente el puerto estándar `5432` dentro de la red de Docker.

Los microservicios se comunican con la base de datos utilizando el nombre del servicio y el puerto interno:

```text
postgres:5432
```

Para acceder a PostgreSQL desde el equipo anfitrión, por ejemplo mediante pgAdmin, se utiliza el puerto definido en la variable:

```text
POSTGRES_PORT
```

En este proyecto se configuró:

```env
POSTGRES_PORT=55432
```

por lo que la conexión desde el equipo anfitrión se realiza utilizando:

```text
127.0.0.1:55432
```

### ¿Por qué se utiliza el puerto 55432?

Durante la configuración del entorno se detectó que el equipo de desarrollo ya contaba con una instalación local de PostgreSQL que utilizaba uno de los puertos que inicialmente se había asignado al contenedor.

Esto provocaba que las conexiones realizadas desde pgAdmin fueran dirigidas hacia la instancia local de PostgreSQL en lugar del servidor ejecutado dentro de Docker.

Para evitar el conflicto se decidió mantener el puerto estándar `5432` únicamente dentro de Docker y asignar el puerto externo `55432` al contenedor.

De esta forma:

```text
Microservicios
      │
      │ postgres:5432
      ▼
PostgreSQL en Docker
      │
      │ 55432:5432
      ▼
Equipo anfitrión / pgAdmin
```

Esta configuración no es obligatoria para otras instalaciones. Si el puerto se encuentra disponible, puede utilizarse otro valor modificando `POSTGRES_PORT` en el archivo `.env`.

## Endpoints iniciales

### Auth Service

```http
GET /health
GET /auth/roles
```

### Catalog Service

```http
GET /health
GET /products
GET /products/:id/stock
```

### Orders Service

```http
GET /health
GET /orders/:id
GET /orders/:id/history
```

### Payments Service

```http
GET /health
GET /payments/:orderId
```

Los endpoints `/health` permiten comprobar rápidamente que cada microservicio se encuentra disponible.

## Base de datos

La solución utiliza PostgreSQL con la base de datos:

```text
belleza_conceptual
```

La implementación incluye:

- 17 tablas.
- Funciones.
- Procedimientos almacenados.
- Triggers.
- Vistas.
- Datos iniciales de configuración.

Los scripts utilizados para la creación de la base de datos se encuentran en:

```text
/database
```

Al iniciar PostgreSQL por primera vez mediante Docker, el script principal permite preparar la estructura necesaria para el proyecto.

## Docker Compose

El archivo:

```text
docker-compose.yml
```

permite administrar de forma conjunta los componentes principales del entorno:

```text
auth-service
catalog-service
orders-service
payments-service
postgres
redis
```

Esto permite iniciar los servicios desde un mismo punto y mantener una configuración consistente entre los diferentes componentes.

## Integración continua

El proyecto utiliza Azure Pipelines para implementar el proceso de integración continua.

La configuración se encuentra definida en:

```text
azure-pipelines.yml
```

El pipeline realiza las siguientes actividades:

1. Obtiene el código fuente.
2. Configura Node.js.
3. Instala las dependencias de los microservicios.
4. Ejecuta las pruebas automatizadas.
5. Construye las imágenes Docker de los servicios.
6. Informa si la ejecución fue satisfactoria o si alguna etapa presentó errores.

## Gestión del proyecto

Azure DevOps se utiliza para apoyar la planificación y seguimiento del desarrollo mediante:

- Azure Boards para Epic, Features, User Stories y Tasks.
- Sprints para organizar el trabajo.
- Azure Repos para mantener el código dentro del entorno de Azure DevOps.
- Azure Pipelines para integración continua.
- Azure Test Plans para registrar y ejecutar casos de prueba.

El repositorio principal también se encuentra versionado mediante Git y GitHub.

## Detener el entorno

Para detener los contenedores:

```powershell
docker compose down
```

Para detener los contenedores y eliminar también los volúmenes:

```powershell
docker compose down -v
```

> **Advertencia:** utilizar `-v` elimina los volúmenes asociados al entorno y puede borrar los datos almacenados en PostgreSQL.
