# ParkFlow Frontend — ZIP 1 of N: Project Foundation

This zip contains only the **foundation layer** of the ParkFlow frontend, meant
to be merged into your existing React + Vite + TypeScript + Tailwind project
(copy the `src/` contents in, and drop `tailwind.config.ts` in your project
root if you don't already have one configured).

## What's included

```
src/
  components/
    ui/
      Button.tsx
      Input.tsx
      Card.tsx
      Spinner.tsx
    Navbar.tsx
    Sidebar.tsx
  context/
    AuthContext.tsx
  layouts/
    AuthLayout.tsx
    DashboardLayout.tsx
  pages/
    Login.tsx
    Register.tsx
    Dashboard.tsx
    NotFound.tsx
  routes/
    AppRoutes.tsx
    ProtectedRoute.tsx
  services/
    axiosInstance.ts
    authService.ts
  types/
    api.types.ts
    auth.types.ts
  utils/
    constants.ts
    validationSchemas.ts
  App.tsx
  main.tsx
  index.css
tailwind.config.ts
```

- **Axios instance** (`services/axiosInstance.ts`) — base URL
  `http://localhost:9090/api/v1`, request interceptor attaches
  `Authorization: Bearer <token>` from `localStorage`, response interceptor
  normalizes `ApiErrorResponse` into a plain `Error` and force-logs-out on
  `401`.
- **AuthContext** — holds `user`, `token`, `isAuthenticated`, `login()`,
  `register()`, `logout()`. Nothing else lives in context, per the brief.
- **ProtectedRoute** — redirects unauthenticated users to `/login`, supports
  an optional `allowedRoles` prop for role-gated route groups (e.g. Admin).
- **DashboardLayout** — responsive Sidebar (collapsible off-canvas on
  mobile, static on `lg+`) + Navbar + routed `<Outlet />`.
- **Login / Register** — fully wired to `POST /auth/login` and
  `POST /auth/register` using React Hook Form + Zod.
- **Dashboard** — a real (not placeholder) landing page with quick-navigation
  cards to the feature areas. There's no dashboard-data endpoint for
  `APP_USER` in the contract, so it intentionally doesn't fetch or fabricate
  data.
- **NotFound** — catch-all 404 page.

## What's next (Part 2 / Part 3)

The Sidebar already links to `/vehicles`, `/parking-lots`, `/bookings`,
`/payments`, and `/admin` — those routes aren't registered in `AppRoutes.tsx`
yet, so they currently fall through to the 404 page until their pages are
built. Adding them later is a drop-in: register each new page's `<Route>`
inside the existing `<ProtectedRoute />` group in `AppRoutes.tsx`.

## ⚠️ One assumption to verify

`FRONTEND_CONTEXT.md` gives the endpoints and the response envelope, but not
the exact field names inside the auth request/response DTOs. I used the
conventional choice below — everything is confined to
`src/types/auth.types.ts`, so if your real DTOs differ, that's the only file
to change:

- `LoginRequest`: `{ email, password }`
- `RegisterRequest`: `{ fullName, email, password, phoneNumber }`
- `AuthResponse` (returned in `data` for both endpoints): `{ token, user: { id, fullName, email, role } }`

If `POST /auth/register` does **not** return a token (i.e. it just creates
the account and expects the user to log in separately), remove the
`persistSession(...)` call inside `register()` in `AuthContext.tsx` and
instead redirect to `/login` after a successful call.

## Dependencies

Make sure these are installed in your existing project:

```bash
npm install axios react-router-dom react-hook-form zod @hookform/resolvers \
  lucide-react react-hot-toast
```

Tailwind, Vite, and TypeScript are assumed to already be configured.
