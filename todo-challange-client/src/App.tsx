import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { AxiosProvider, AxiosSettings } from './providers/axios-provider';

const REQUEST_STALE_TIME = 1000 * 60;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const axiosSettings: AxiosSettings = {
  redirectUrl: '/login'
}

function App() {
  const queryClient = useRef(new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: REQUEST_STALE_TIME,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient.current}>
      <AxiosProvider settings={axiosSettings} >
        <RouterProvider router={router} />
      </AxiosProvider>
    </QueryClientProvider>
  );
}

export default App;
