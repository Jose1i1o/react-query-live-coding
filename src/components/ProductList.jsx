import ProductCard from "./ProductCard";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import {GetUsers} from "./GetUsers";
import UserForm from "./UserForm";


const ProductList = () => {

  const [ showArray, setShowArray ] = useState(false);

  const getProducts = async() => {

    const response = await fetch('https://peticiones.online/api/products')

    // if(response.ok) {
    //   throw new Error('Error while fetching products')
    // }
    if(!response.ok) {
      throw new Error('Error while fetching products')
    }
    return response.json();
  }

  const { data, status, isLoading, error, isFetching, isIdle, refetch } = useQuery(['products'], getProducts, {
    staleTime: Infinity, // Infinity will keep your data for 5 minutes and then eliminate it if not used
    // enabled: false
  });

  // if(status === 'loading') {
  //   return <p>Loading products</p>
  // }

  // if(isIdle) {
  //   return <button onClick={refetch}>Fetch Posts</button>
  // }

  if(isLoading) {
    return <p>Loading products</p>
  }

  if(error) {
    return <p>Error</p>
  }

  // if(status === 'error') {
  //   return <p>Error</p>
  // }

  return (
    <>
      <h2>Product List: { isFetching && <p>Is fetching</p> }</h2>
      <div className="products">
      { data.results?.map( product => <ProductCard key={product.id} product={product} /> ) }
      </div>
      <button onClick={ refetch }> Refetch products </button>
      { showArray && <div>{ <GetUsers /> }</div> }
        <button onClick={ () => setShowArray(!showArray)} className="m-2"> Show me who created this </button>
      <UserForm />
    </>
  )
}

export default ProductList