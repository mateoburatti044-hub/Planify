
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('🚀 Iniciando aplicación...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ No se encontró elemento root');
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Error: No se puede encontrar elemento root</div>';
  throw new Error("Could not find root element to mount to");
}

console.log('✅ Elemento root encontrado');

try {
  console.log('📦 Intentando importar App...');
  console.log('✅ App importado correctamente');
  
  const root = ReactDOM.createRoot(rootElement);
  console.log('✅ Root de React creado');
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  console.log('✅ Aplicación renderizada');
} catch (error) {
  console.error('❌ Error al renderizar aplicación:', error);
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: monospace; background: #f0f0f0; border: 2px solid red;">
        <h1>❌ Error en la aplicación</h1>
        <p><strong>Error:</strong> ${error instanceof Error ? error.message : 'Error desconocido'}</p>
        ${error instanceof Error ? `<p><strong>Stack:</strong> ${error.stack}</p>` : ''}
        <p>Abre la consola (F12) para más detalles</p>
      </div>
    `;
  }
}
