import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import './style/App.css';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
    </>
  );
}

export default App;
