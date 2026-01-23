# Project Planify – QA Portfolio

## Status
🔄 **Beta**

## Overview
Planify is a comprehensive project management and task tracking application with integrated QA testing. This repository contains automated tests and the application source code for the Planify management system.

## Known Issues
- ⚠️ Reports module not connected to backend
- 🎨 UI improvements pending

## What Was Tested

### Features Tested
- ✅ Users
- ✅ Projects
- ✅ Tasks
- ✅ Dashboard

### Testing Types
- **Functional Testing**: Verifying core features work as expected
- **Exploratory Testing**: Uncovering potential issues and edge cases
- **Sanity Testing**: Ensuring basic functionality remains intact

## Tools & Technologies

### Development & Testing
- **VS Code**: Code editor and development environment
- **Jira-like Board**: Project management and tracking
- **Manual Testing**: QA validation and verification
- **Cypress**: End-to-end testing framework
- **TypeScript/React**: Frontend application
- **Node.js**: Backend services

## Project Structure

```
cypress/
├── e2e/
│   ├── 1-getting-started/          # Cypress example tests
│   ├── 2-advanced-examples/        # Advanced test examples
│   ├── Pruebas-Planify/            # Planify-specific tests
│   │   ├── app/                    # Planify application source
│   │   └── Pruebas Planify.cy.js   # Main test suite
│   ├── Prubas-TiendaNube/          # TiendaNube tests
│   └── Pruebas-orangehrmlive/      # OrangeHRM tests
├── fixtures/                        # Test data files
├── support/                         # Cypress configuration & helpers
└── downloads/                       # Test artifacts
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git
- Cypress

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/mateoburatti044-hub/Planify.git
   cd Planify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run Cypress tests**
   ```bash
   # Open Cypress Test Runner
   npx cypress open
   
   # Run tests headlessly
   npx cypress run
   ```

## Running Tests

### Run all tests
```bash
npm run test
```

### Run specific test suite
```bash
npx cypress run --spec "cypress/e2e/Pruebas-Planify/Pruebas Planify.cy.js"
```

### Run with specific browser
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
```

## Key Features Tested

### Users Module
- User creation and management
- User authentication
- Role-based access control
- User profile updates

### Projects Module
- Project creation and deletion
- Project assignment
- Project status tracking
- Team collaboration

### Tasks Module
- Task creation and management
- Task assignment to users
- Task status updates
- Priority levels
- Due dates and deadlines

### Dashboard
- Overview statistics
- Recent activities
- User analytics
- Project progress tracking

## Test Coverage

| Module | Coverage | Status |
|--------|----------|--------|
| Users | 100% | ✅ Tested |
| Projects | 100% | ✅ Tested |
| Tasks | 100% | ✅ Tested |
| Dashboard | 95% | ✅ Tested |
| Reports | 0% | ❌ Not connected |

## Backend Connection
The application uses a mock backend for development and testing. The backend API is configured in:
- `cypress/e2e/Pruebas-Planify/app/api_client.ts`
- `cypress/e2e/Pruebas-Planify/app/backend_server.ts`

## Configuration
- **Environment**: `.env.local` file in the app directory
- **TypeScript**: `tsconfig.json` for type checking
- **Build**: Vite as the build tool (`vite.config.ts`)

## Development Notes

### Application Files
- **App.tsx**: Main application component
- **pages/**: Page components (Login, Dashboard, Projects, Tasks, Users, Reports, Settings)
- **components/**: Reusable UI components
- **services/**: API client and service layer
- **contexts/**: React context for state management (AuthContext)

### Recent Changes
The application includes several improvements and fixes documented in:
- `CAMBIOS_ANTES_Y_DESPUES.txt`
- `RESUMEN_CAMBIOS.txt`
- `SOLUCION_DEFINITIVA.txt`

## Roadmap

### Next Steps
- 🔌 Connect Reports module to backend
- 🎨 Implement UI/UX improvements
- 📱 Add mobile responsive design
- 🔒 Enhance security features
- 📊 Expand test coverage for Reports module

## GitHub Repository
- **Repository**: [mateoburatti044-hub/Planify](https://github.com/mateoburatti044-hub/Planify)
- **Branch**: main
- **Last Updated**: January 2026

## Contributing
For contributions, please:
1. Create a new branch from `main`
2. Make your changes
3. Commit with descriptive messages
4. Push and create a Pull Request

## Support & Issues
For issues, bugs, or feature requests, please open an issue in the GitHub repository.

## License
This project is part of a QA Portfolio for testing and demonstration purposes.

---

**Project Status**: Under active development and testing  
**Last Updated**: January 23, 2026
