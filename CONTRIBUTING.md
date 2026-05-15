# 🤝 Guía de Contribución - Planify QA

¡Gracias por tu interés en contribuir a Planify QA! Este documento proporciona pautas y instrucciones para contribuir al proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Contribuir?](#cómo-contribuir)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Features](#sugerir-features)
- [Pull Requests](#pull-requests)
- [Guías de Estilo](#guías-de-estilo)
- [Proceso de Desarrollo](#proceso-de-desarrollo)

## 💬 Código de Conducta

### Nuestro Compromiso

En el interés de fomentar un ambiente abierto y acogedor, nosotros como colaboradores y mantenedores nos comprometemos a hacer la participación en nuestro proyecto y nuestra comunidad una experiencia libre de acoso para todos.

### Estándares

Los ejemplos de comportamiento que contribuyen a crear un ambiente positivo incluyen:

- Usar lenguaje acogedor e inclusivo
- Ser respetuoso con los puntos de vista y experiencias divergentes
- Aceptar crítica constructiva
- Enfocarse en lo que es mejor para la comunidad
- Mostrar empatía hacia otros miembros de la comunidad

Los ejemplos de comportamiento inaceptable incluyen:

- Uso de lenguaje o imágenes sexuales
- Ataques personales
- Trolling o comentarios insultantes
- Acoso público o privado
- Publicar información privada sin permiso

## 🎯 ¿Cómo Contribuir?

### 1. Reportar Bugs

#### Antes de Reportar
- Verifica si el bug ya fue reportado
- Comprueba que estés usando la versión más reciente
- Intenta reproducir el bug en diferentes navegadores

#### Cómo Reportar un Bug
Abre un [issue](https://github.com/usuario/planify-qa/issues) e incluye:

- **Título descriptivo:** "Image upload fails in TaskForm on Chrome"
- **Descripción clara:** Qué esperabas vs. qué pasó
- **Pasos para reproducir:**
  ```
  1. Ir a Settings
  2. Click en "Descargar Backup"
  3. Intentar cargar archivo corrupto
  4. Error: "Invalid JSON"
  ```
- **Capturas de pantalla:** Si es relevante
- **Información del sistema:**
  ```
  - OS: Windows 11
  - Navegador: Chrome 120
  - Node: 18.17.0
  ```

### 2. Sugerir Features

#### Proceso
1. Usa el título: "[FEATURE] Descripción breve"
2. Proporciona caso de uso
3. Describe la solución deseada
4. Proporciona ejemplos si es posible

#### Ejemplo
```
[FEATURE] Agregar filtros avanzados en tareas

## Descripción
Como QA, quiero filtrar tareas por múltiples criterios para encontrar rápidamente las pruebas que necesito.

## Solución Deseada
- Filtro por estado + prioridad
- Búsqueda por palabra clave
- Filtro por asignado
- Guardar filtros personalizados

## Contexto
Actualmente tengo 500+ tareas y tardaré 10+ minutos en encontrar bugs críticos.
```

## 🔄 Pull Requests

### Antes de Empezar

1. Fork el repositorio
2. Clonar tu fork
   ```bash
   git clone https://github.com/tu-usuario/planify-qa.git
   cd planify-qa
   ```
3. Crear rama descriptiva
   ```bash
   git checkout -b fix/upload-image-bug
   # o
   git checkout -b feature/advanced-filters
   ```

### Durante el Desarrollo

```bash
# Instalar dependencias
npm install

# Navegar a la carpeta app
cd cypress/e2e/Pruebas-Planify/app

# Iniciar Vite en desarrollo
npx vite --host 0.0.0.0 --port 5173

# En otra terminal, ejecutar tests
npm run test
```

### Commits

- Usar lenguaje imperativo: "Add feature" no "Added feature"
- Commits pequeños y lógicos
- Mensajes descriptivos

```bash
git commit -m "Fix: Prevent data loss on localStorage error"
git commit -m "Feature: Add image preview in EvidenceManager"
git commit -m "Refactor: Simplify attachment validation"
```

### Antes de Push

1. Actualizar desde main
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. Asegurar tests pasen
   ```bash
   npm test
   ```

3. Verificar linting
   ```bash
   npm run lint
   ```

### Crear Pull Request

1. Push a tu fork
   ```bash
   git push origin fix/upload-image-bug
   ```

2. Abrir PR en GitHub con:
   - Título claro
   - Descripción detallada
   - Link a issue relacionado (#123)
   - Checklist:
     - [ ] Tests agregados/actualizados
     - [ ] Documentación actualizada
     - [ ] Cambios compatibles con versiones anteriores
     - [ ] Sin breaking changes

#### Ejemplo de PR Description
```markdown
## Descripción
Corrige el error donde las imágenes grandes fallan al cargarse en el componente EvidenceManager.

## Tipo de Cambio
- [x] Bug fix (cambio no-breaking que fija un issue)
- [ ] Nueva feature (cambio no-breaking que agrega funcionalidad)
- [ ] Breaking change

## Cambios
- Agregar validación de tamaño antes de conversión base64
- Mostrar error user-friendly si archivo > 50MB
- Agregar pruebas para validación

## Testing
- [x] Tests existentes aún pasan
- [x] Nuevos tests agregados
- [x] Testeado manualmente en Chrome, Firefox, Safari

## Screenshots
Antes:
![before](url)

Después:
![after](url)

Cierra #456
```

## 📝 Guías de Estilo

### TypeScript

```typescript
// ✅ Bueno
interface TaskAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
}

// ❌ Evitar
interface TaskAttachment {
  id: any;
  fileName: String; // usar string
  filesize: number; // inconsistente
  uploaded_at: string; // usar camelCase
}
```

### React Components

```typescript
// ✅ Bueno - Functional component con tipos
interface EvidenceManagerProps {
  taskId: string;
  attachments: TaskAttachment[];
  onAddAttachment: (attachment: TaskAttachment) => void;
}

export const EvidenceManager: React.FC<EvidenceManagerProps> = ({
  taskId,
  attachments,
  onAddAttachment,
}) => {
  // ...
};

// ❌ Evitar
function EvidenceManager(props) {
  // ...
}
```

### Comentarios

```typescript
// ✅ Bueno - Explica el por qué
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit for browser localStorage compatibility

// ❌ Evitar
const MAX_FILE_SIZE = 52428800; // max size
```

### CSS/Tailwind

```jsx
// ✅ Bueno - Clases organizadas
<button
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
>
  Upload
</button>

// ❌ Evitar
<button style={{padding: '10px', backgroundColor: 'blue'}}>
  Upload
</button>
```

## 🔧 Proceso de Desarrollo

### Estructura de Carpetas

```
app/
├── components/        # Componentes reutilizables
│   ├── EvidenceManager.tsx
│   ├── Layout.tsx
│   └── ...
├── pages/            # Páginas/rutas
│   ├── TaskForm.tsx
│   ├── Settings.tsx
│   └── ...
├── services/         # Lógica de negocio
│   ├── persistenceService.ts
│   ├── attachmentService.ts
│   └── ...
├── contexts/         # Context API
│   └── AuthContext.tsx
├── types.ts          # TypeScript interfaces
└── vite.config.ts
```

### Flujo de Características

1. **Planificación:**
   - Abrir issue con descripción
   - Discutir enfoque
   - Obtener aprobación

2. **Desarrollo:**
   - Crear rama desde `main`
   - Implementar con tests
   - Actualizar documentación

3. **Testing:**
   - Tests unitarios ✅
   - Tests integración ✅
   - Testing manual ✅

4. **Code Review:**
   - PR review por maintainer
   - Ajustes solicitados
   - Aprobación

5. **Merge:**
   - Squash commits (si aplica)
   - Merge a main
   - Deploy

## 📚 Documentación

Actualizar documentación para:

- **Nuevas features:** README.md + CHANGELOG
- **API changes:** Comentarios en código
- **Procesos:** CONTRIBUTING.md (este archivo)
- **Setup:** QUICK_START.txt

## ✅ Checklist para Contribuidores

Antes de enviar tu PR, verifica:

- [ ] Fork y rama creada desde `main`
- [ ] Cambios locales completados
- [ ] Tests nuevos/actualizados
- [ ] Tests pasan: `npm test`
- [ ] Lint pasa: `npm run lint`
- [ ] Documentación actualizada
- [ ] Commits con mensajes claros
- [ ] No hay conflictos con `main`
- [ ] PR description clara
- [ ] Checklist en PR completado

## 🚀 Después del Merge

Una vez tu PR es mergeado:

- ¡Felicidades! Ahora eres contribuidor oficial
- Tu nombre se agregará a CONTRIBUTORS.md
- Se hará mención en el próximo CHANGELOG
- Eres bienvenido para tomar más issues

## 📞 Preguntas?

- Abre un [Discussion](https://github.com/usuario/planify-qa/discussions)
- Contáctanos por email
- Únete a nuestro Slack/Discord (si disponible)

## 📄 Licencia

Al contribuir a Planify QA, aceptas que tus contribuciones serán licenciadas bajo su MIT License.

---

¡Gracias por ayudar a mejorar Planify QA! 🙌
