# Belleza Conceptual - DEVOPS 1

Repositorio base para la implementación DEVOPS 1 de la tienda en línea de Belleza Conceptual.

## Componentes

- `auth-service`: usuarios y roles.
- `catalog-service`: catálogo, productos e inventario.
- `orders-service`: pedidos y seguimiento.
- `payments-service`: consulta y gestión de pagos.
- PostgreSQL: persistencia principal.
- Redis: caché temporal del catálogo.

## Requisitos

- Git
- Docker Desktop con Docker Compose

## Inicio rápido

1. Crear el archivo local de variables:

   ```bash
   cp .env.example .env
   ```

2. Editar `.env` y asignar una contraseña local a PostgreSQL.

3. Levantar la solución:

   ```bash
   docker compose up --build -d
   ```

4. Revisar contenedores:

   ```bash
   docker compose ps
   ```

## Servicios

| Servicio | Puerto | Verificación |
|---|---:|---|
| Auth | 3001 | `http://localhost:3001/health` |
| Catalog | 3002 | `http://localhost:3002/health` |
| Orders | 3003 | `http://localhost:3003/health` |
| Payments | 3004 | `http://localhost:3004/health` |
| PostgreSQL | 5432 | Base `belleza_conceptual` |
| Redis | 6379 | Redis |

## Endpoints iniciales

- `GET /auth/roles`
- `GET /products`
- `GET /products/:id/stock`
- `GET /orders/:id`
- `GET /orders/:id/history`
- `GET /payments/:orderId`

## Detener el entorno

```bash
docker compose down
```

Para eliminar también los volúmenes de desarrollo:

```bash
docker compose down -v
```
