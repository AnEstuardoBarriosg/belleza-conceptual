# Belleza Conceptual - DEVOPS 1

Repositorio correspondiente a la implementación DEVOPS 1 de la tienda en línea de Belleza Conceptual.

El proyecto utiliza una arquitectura basada en servicios contenerizados mediante Docker, con PostgreSQL como base de datos principal, Redis como servicio de caché y Azure DevOps para la planificación, integración continua y gestión de pruebas.

## Componentes

- `auth-service`: gestión de usuarios y roles.
- `catalog-service`: catálogo de productos e inventario.
- `orders-service`: gestión de pedidos y seguimiento.
- `payments-service`: consulta y gestión de pagos.
- PostgreSQL: persistencia principal del sistema.
- Redis: almacenamiento temporal y caché del catálogo.

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
- Azure Boards
- Azure Repos
- Azure Pipelines
- Azure Test Plans

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
