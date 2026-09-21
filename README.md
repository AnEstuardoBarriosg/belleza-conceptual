# Belleza Conceptual - DEVOPS 1

Repositorio correspondiente a la implementación DEVOPS 1 de la tienda en línea de Belleza Conceptual.

El proyecto utiliza una arquitectura basada en servicios contenerizados con Docker. PostgreSQL se utiliza como base de datos principal y Redis como servicio de caché. La planificación, integración continua y gestión de pruebas se realizan mediante Azure DevOps.

## Componentes

- `auth-service`: gestión de usuarios y roles.
- `catalog-service`: catálogo de productos e inventario.
- `orders-service`: gestión de pedidos y seguimiento.
- `payments-service`: consulta y gestión de pagos.
- PostgreSQL: base de datos principal.
- Redis: servicio de caché temporal.

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

Para ejecutar el proyecto localmente se necesita:

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

Editar el archivo `.env` y configurar las variables necesarias para el entorno local.

El archivo `.env` no se encuentra versionado para evitar almacenar credenciales dentro del repositorio.

## Iniciar el entorno

Construir e iniciar los contenedores:

```powershell
docker compose up --build -d
```

Verificar el estado de los servicios:

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

PostgreSQL utiliza internamente el puerto `5432` dentro de Docker. El puerto `55432` se utiliza para acceder a la base desde el equipo anfitrión, por ejemplo mediante pgAdmin.

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

## Base de datos

La solución utiliza PostgreSQL con la base de datos:

```text
belleza_conceptual
```

La implementación incluye las tablas y objetos definidos para el sistema, entre ellos funciones, procedimientos almacenados, triggers y vistas.

Los scripts correspondientes se encuentran en:

```text
/database
```

## Integración continua

El proyecto utiliza Azure Pipelines para ejecutar el proceso de integración continua.

El pipeline realiza la instalación de dependencias, ejecución de pruebas y construcción de las imágenes Docker de los microservicios.

La configuración se encuentra en:

```text
azure-pipelines.yml
```

## Gestión del proyecto

Azure DevOps se utiliza para la gestión del proyecto mediante:

- Azure Boards para Epic, Features, User Stories y Tasks.
- Azure Repos para mantener una copia del repositorio dentro de Azure DevOps.
- Azure Pipelines para integración continua.
- Azure Test Plans para registrar y ejecutar los casos de prueba.

## Detener el entorno

Para detener los contenedores:

```powershell
docker compose down
```

Para detener el entorno y eliminar también los volúmenes:

```powershell
docker compose down -v
```

> **Advertencia:** el parámetro `-v` elimina los volúmenes del entorno y puede borrar los datos almacenados en PostgreSQL.
