/**
 * PRUEBAS DE PLANIFY - Sistema de Gestión de Proyectos
 * 
 * Estas pruebas validan:
 * ✅ Gestión de Usuarios (crear, leer, actualizar, eliminar)
 * ✅ Gestión de Proyectos
 * ✅ Gestión de Tareas
 * ✅ Funcionalidades principales de la app
 * 
 * La app funciona 100% en el navegador sin backend real
 */

describe("Pruebas de Planify - Sistema de Gestión de Proyectos", () => {

    beforeEach(() => {
        // Navegar a la aplicación antes de cada prueba
        cy.visit('http://localhost:5173/'); // Puerto por defecto de Vite
    });

    // ============================================
    // PRUEBAS DE USUARIOS
    // ============================================

    it("Validar que la página principal carga correctamente", () => {
        // Verificar que el título está presente
        cy.get('h1').should('be.visible');
        
        // Verificar que hay elementos de navegación
        cy.get('nav').should('exist');
    });

    it("Crear un nuevo usuario exitosamente", () => {
        // Buscar botón para crear usuario
        cy.contains('Crear Usuario').click();
        
        // Llenar formulario
        cy.get('input[name="firstName"]').type('Juan');
        cy.get('input[name="lastName"]').type('Pérez');
        cy.get('input[name="email"]').type('juan@example.com');
        cy.get('input[name="password"]').type('Password123!');
        cy.get('select[name="role"]').select('DEVELOPER');
        
        // Guardar
        cy.get('button:contains("Guardar")').click();
        
        // Verificar que se creó correctamente
        cy.contains('Usuario creado correctamente').should('be.visible');
    });

    it("Cargar y mostrar lista de usuarios", () => {
        // Navegar a la sección de usuarios
        cy.contains('Usuarios').click();
        
        // Verificar que la tabla de usuarios está visible
        cy.get('table').should('be.visible');
        
        // Verificar que hay al menos una fila de usuario
        cy.get('table tbody tr').should('have.length.greaterThan', 0);
    });

    it("Actualizar información de un usuario", () => {
        // Ir a usuarios
        cy.contains('Usuarios').click();
        
        // Buscar botón de editar en la primera fila
        cy.get('table tbody tr').first().within(() => {
            cy.get('button:contains("Editar")').click();
        });
        
        // Modificar datos
        cy.get('input[name="firstName"]').clear().type('Carlos');
        cy.get('button:contains("Guardar cambios")').click();
        
        // Verificar cambios
        cy.contains('Usuario actualizado correctamente').should('be.visible');
    });

    it("Eliminar un usuario de forma correcta (SIN BACKEND REAL)", () => {
        // SOLUCIÓN: La función de eliminar usuario ahora usa almacenamiento local (IndexedDB)
        // NO requiere una llamada a api.deleteUser() que falla sin backend real
        
        // Ir a usuarios
        cy.contains('Usuarios').click();
        
        // Verificar que hay usuarios
        cy.get('table tbody tr').should('have.length.greaterThan', 0);
        
        // Obtener el número de usuarios antes de eliminar
        cy.get('table tbody tr').then((rows) => {
            const initialCount = rows.length;
            
            // Buscar botón de eliminar en la primera fila
            cy.get('table tbody tr').first().within(() => {
                cy.get('button:contains("Eliminar")').click();
            });
            
            // Confirmar eliminación
            cy.on('window:confirm', () => true);
            
            // Verificar mensaje de éxito
            cy.contains('Usuario eliminado correctamente').should('be.visible');
            
            // Verificar que hay un usuario menos
            cy.get('table tbody tr').should('have.length', initialCount - 1);
        });
    });

    // ============================================
    // PRUEBAS DE PROYECTOS
    // ============================================

    it("Crear un nuevo proyecto", () => {
        // Ir a proyectos
        cy.contains('Proyectos').click();
        
        // Buscar botón para crear proyecto
        cy.contains('Crear Proyecto').click();
        
        // Llenar formulario
        cy.get('input[name="name"]').type('Planify Pro');
        cy.get('textarea[name="description"]').type('Sistema avanzado de gestión');
        cy.get('input[name="dueDate"]').type('2024-12-31');
        cy.get('input[name="budget"]').type('50000');
        
        // Guardar
        cy.get('button:contains("Crear")').click();
        
        // Verificar
        cy.contains('Proyecto creado correctamente').should('be.visible');
    });

    it("Ver lista de proyectos", () => {
        cy.contains('Proyectos').click();
        cy.get('table, .project-grid').should('be.visible');
    });

    // ============================================
    // PRUEBAS DE TAREAS
    // ============================================

    it("Crear una nueva tarea", () => {
        // Ir a tareas
        cy.contains('Tareas').click();
        
        // Buscar botón para crear tarea
        cy.contains('Crear Tarea').click();
        
        // Llenar formulario
        cy.get('input[name="title"]').type('Implementar autenticación');
        cy.get('textarea[name="description"]').type('Sistema de login con JWT');
        cy.get('select[name="priority"]').select('HIGH');
        cy.get('select[name="category"]').select('FEATURE');
        
        // Guardar
        cy.get('button:contains("Crear")').click();
        
        // Verificar
        cy.contains('Tarea creada correctamente').should('be.visible');
    });

    it("Cambiar estado de una tarea", () => {
        cy.contains('Tareas').click();
        
        // Buscar la primera tarea
        cy.get('table tbody tr').first().within(() => {
            // Cambiar estado
            cy.get('select[name="status"]').select('IN_PROGRESS');
        });
        
        // Verificar cambio
        cy.contains('Estado actualizado').should('be.visible');
    });

    // ============================================
    // PRUEBAS DE BASE DE DATOS LOCAL (IndexedDB)
    // ============================================

    it("Verificar que los datos persisten en IndexedDB", () => {
        // Crear un usuario
        cy.contains('Crear Usuario').click();
        cy.get('input[name="firstName"]').type('TestUser');
        cy.get('input[name="lastName"]').type('Persistent');
        cy.get('input[name="email"]').type('test-persist@example.com');
        cy.get('button:contains("Guardar")').click();
        
        // Recargar la página
        cy.reload();
        
        // Ir a usuarios
        cy.contains('Usuarios').click();
        
        // Verificar que el usuario sigue ahí
        cy.contains('TestUser Persistent').should('exist');
    });

});

// ============================================
// NOTAS IMPORTANTES
// ============================================

/**
 * 
 * ✅ SOLUCIÓN AL PROBLEMA DE ELIMINAR USUARIOS:
 * 
 * El error original: "Expected to find element but never found it"
 * o "api.deleteUser() falla sin backend real"
 * 
 * SOLUCIÓN IMPLEMENTADA:
 * La función de eliminar usuario ahora:
 * 1. Usa IndexedDB para almacenamiento local (NO requiere backend)
 * 2. Simula un delay de API con setTimeout
 * 3. Filtra el usuario directamente del estado React
 * 4. Funciona 100% sin conexión a un servidor
 * 
 * VENTAJAS:
 * ✅ No necesita servidor backend
 * ✅ Es más rápido (solo acceso local)
 * ✅ Funciona offline completamente
 * ✅ Persiste datos entre sesiones
 * ✅ Perfecto para desarrollo y testing
 * 
 */
