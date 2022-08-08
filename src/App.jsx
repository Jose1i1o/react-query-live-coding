import './App.css'
import ProductList from './components/ProductList';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: 2,
      // retry: false,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // disable refetch on window focus or changing tabs
      // refetchInterval: 2000, // refetch every 2 seconds
    }
  }
});

function App() {

  return (
    <>
      <QueryClientProvider client={ queryClient }>
        <div className="App">
          <ProductList />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
