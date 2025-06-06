# 🧠 Feature-Based Architecture Guide

This guide outlines how to contribute code using the **feature-based folder structure** in this Next.js (App Router) project. It is intended for **developers working within the `/features` directory** and enforces structure, conventions, and best practices for scalable frontend development.

---

## 📁 Project Structure Overview

We organize code by **features**, not by type. Each feature manages its own components, logic, styles, and services:

```
/src
  /app               # Next.js App Router entry points
  /features          # Domain-specific feature modules
    /feature-name/
      /components/   # Feature-specific UI components
      /hooks/        # Feature-specific React hooks
      /services/     # Feature-specific business logic
      /styles/       # Feature-specific styling
      /utils/        # Feature-specific helper functions
      /pages/        # Feature route entry points
  
  /components        # Shared components used across features
  /hooks             # Shared hooks used across features
  /utils             # Shared utilities used across features
  /styles            # Global styles, themes, variables
  /lib               # Shared libraries/adapters
  /types             # Global TypeScript types
  /config            # App configuration
```

- **Each folder under `/features` is a self-contained domain module.**
- **Shared code lives at the root of `/src` for easy access across features.**
- **No cross-feature imports unless intentional and necessary.**

---

## ✅ What Belongs Where

### Feature Modules

| Folder          | Purpose                                              |
|-----------------|------------------------------------------------------|
| `components/`   | UI components local to the feature                   |
| `hooks/`        | Custom React hooks used only within the feature      |
| `services/`     | Business logic and API interaction (fetchers, etc.) |
| `styles/`       | Feature-specific CSS, SCSS, or Tailwind modules      |
| `utils/`        | Helper functions (only used within the feature)      |
| `pages/`        | Route entry points (App Router `/app` structure)     |

### Shared Code at Root Level

| Folder          | Purpose                                              |
|-----------------|------------------------------------------------------|
| `/components`   | Reusable UI components used across multiple features |
| `/hooks`        | Common React hooks shared by different features      |
| `/utils`        | Global utilities and helper functions                |
| `/styles`       | Global styling, themes, and design tokens            |
| `/lib`          | Shared libraries, API clients, and adapters          |

---

## 🧩 Coding Conventions

### 📦 Feature Ownership

- Each team or dev owns specific features.
- Avoid editing outside your assigned feature unless discussed with the owner.

### 🚫 Import Conventions

- **Don't import from one feature into another feature directly.**
  - If code needs to be shared, move it to the appropriate root-level folder.
- **Feature-specific imports:**
  ```ts
  // Good - importing within the same feature
  import { UserAvatar } from './components/UserAvatar';
  ```
- **Shared code imports:**
  ```ts
  // Good - importing shared code
  import { Button } from '@/components/Button';
  import { useAuth } from '@/hooks/useAuth';
  ```

### 📘 Component Naming

- Components should be **PascalCase** and placed in their feature's `components/` folder or the shared `/components` folder.
- Files should match the component name: `LoginForm.tsx`, `DashboardCard.tsx`

### 🧪 Testing

- Tests (if applicable) should be colocated: `MyComponent.test.tsx`
- Keep feature logic easily testable and modular.

### 🗂 Routing (App Router)

- Feature route pages go in `/features/feature-name/pages/your-route/page.tsx`
- Then re-export or link them in the `app/` directory via:

```ts
// app/your-route/page.tsx
export { default } from '@/features/feature-name/pages/your-route/page';
```

## 📋 File Hygiene

- Keep files small and focused.
- Separate concerns: logic in services/hooks, UI in components.
- Avoid nested folders unless necessary for clarity.
- Consider adding barrel exports (`index.ts`) to simplify imports.

## 🔍 When to Move Code to Shared Folders

- When a component, hook, or utility is used by more than one feature
- When code provides foundational functionality (authentication, data fetching, etc.)
- When you want to enforce consistent patterns across features

## 📝 Summary

- Think in features, not files.
- Keep everything related to a domain close together within its feature folder.
- Use the root-level folders for truly shared code.
- Build modular, isolated, testable units.
- Be consistent — the structure scales when everyone follows it.