```markdown
# EatCommerce

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## 🚀 Últimas Actualizaciones

### 1. Landing Page: Menú Interactivo 2D
Se implementó una experiencia de usuario inmersiva en la página principal (`/`), donde los usuarios pueden explorar el menú del restaurante navegando por un "mapa 2D" arrastrable (Drag & Drop).
- **Interactividad:** Navegación fluida por el lienzo arrastrando el cursor o usando gestos táctiles en móviles.
- **Tarjetas Dinámicas:** El menú está dividido en secciones de Platos Fuertes (Bandeja Paisa, Carne Asada, Sancocho, Ajiaco), Entradas (Empanadas) y Bebidas (Limonada de Coco, Jugo de Lulo, Cerveza).
- **UI/UX:** Sistema de *scroll* vertical interno en las tarjetas largas (`max-h-[400px] overflow-y-auto`) para mantener el diseño limpio, usando Tailwind CSS y efectos Glassmorphism.

### 2. Módulo de Proveedores (HU-16) - Dashboard Admin
Se desarrolló la historia de usuario 16 enfocada en la gestión completa de proveedores y compras, aplicando una arquitectura limpia orientada al Frontend dentro de `src/app/dashboard/suppliers/`.

**Arquitectura Implementada:**
- **Types (`/types`):** Definición estricta de interfaces DTO (`SupplierDTO`, `PurchaseDTO`, `PurchaseReportDTO`).
- **API Clients (`/api`):** Funciones `fetch` listas para conectar al backend (actualmente utilizando *mocks* y `setTimeout` para simular latencia de red y permitir el desarrollo UI de forma independiente).
- **Servicios (`/services`):** Capa de abstracción que comunica los hooks con la API.
- **Hooks Personalizados (`/hooks`):** `useSuppliers` y `usePurchases` para el manejo centralizado del estado, carga (loading) y re-petición de datos (refetch).
- **Componentes (`/components`):** - `SupplierTable`: Tabla de proveedores registrados.
  - Modales CRUD: `CreateSupplierModal`, `EditSupplierModal`, `DeleteSupplierModal`.
  - `PurchasesSection` & `PurchaseReportSection`: Historial de compras y generación de reportes por rango de fechas.

**Seguridad y Navegación:**
- La ruta está protegida y enlazada dinámicamente en el Sidebar (`src/components/dashboard/nav-config.ts`).
- Acceso restringido únicamente para usuarios con el rol `["ADMIN"]`.

---

## ⚙️ Configuración de API (Refactor)

Este proyecto ahora centraliza la URL base de la API en `src/lib/config.ts` y utiliza una capa de servicio en `src/lib/api/products.ts` más un hook `src/lib/hooks/useProducts.ts`.

- Variable de entorno soportada: `NEXT_PUBLIC_API_URL`
  - Ejemplo: `NEXT_PUBLIC_API_URL=http://192.168.101.11:8080`
  - Si no se define, se usará el valor por defecto anterior.

### Beneficios del refactor
- Separación de responsabilidades (UI, datos, configuración).
- Código más modular y escalable.
- Reutilización de llamadas a la API y manejo de estados de carga/errores.

### Rutas afectadas
- Página: `src/app/dashboard/products/page.tsx` ahora consume `useProducts`.
- API legacy: `src/app/dashboard/products/api/route.ts` reexporta desde `src/lib/api/products.ts` para mantener compatibilidad.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```
