import { useRoutes, Link } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import './App.css';

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <ShowCreators />
    },
    {
      path: '/creator/:id',
      element: <ViewCreator />
    },
    {
      path: '/edit/:id',
      element: <EditCreator />
    },
    {
      path: '/add',
      element: <AddCreator />
    }
  ]);

  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;