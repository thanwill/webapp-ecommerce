import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style/App.css';
import RouteConfig from './pages/RouteConfig';
import ErrorBoundary from './components/ErrorBoundary';
import MessageDisplay from './components/MessageDisplay';
function App() {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowComponent(window.innerWidth > 760);
    };

    handleResize(); // Verificar a largura da tela quando o componente é montado

    window.addEventListener('resize', handleResize); // Adicionar listener para atualizações de redimensionamento

    return () => {
      window.removeEventListener('resize', handleResize); // Remover listener quando o componente é desmontado
    };
  }, []);

  return (
    <>
      <ErrorBoundary>
        {showComponent ? (
          <MessageDisplay />
        ) : (
          <>
            <RouteConfig>
              
            </RouteConfig>
          </>
        )}
      </ErrorBoundary>
    </>
  );
}

export default App;
