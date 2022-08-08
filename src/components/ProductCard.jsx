

const ProductCard = ({ product }) => {
  return (
  <>
    <div className="card">
      <div className="imgBox">
        <img src={ product.image } alt={ product.name } className="foto" />
      </div>
      <div className="contentBox">
        <h3>{ product.name }</h3>
        <h2 className="price">{ product.price }€</h2>
        <a href="#" className="buy">Buy Now</a>
      </div>
    </div>
  </>
)}

export default ProductCard