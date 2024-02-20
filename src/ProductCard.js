import React from 'react';

const ProductCard = (props) => {
  const renderOldPrice = () => {
    if (props.product.discount > 0) {
      const oldPrice = props.product.price;
      return <div className="old-price">R$ {oldPrice.toFixed(2)}</div>;
    }
    return null;
  };

  return (
    <div className="card"  >
      <div>
        <img className="card_img" src={props.product.image_url} />

        {props.product.best_choice && (
          <span name="melhor_compra" className="u-svg-link" title='Melhor Compra'>
            <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"color="red"   viewBox="0 0 50 50" x="0px" y="0px">
              <path d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543	c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503	c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"/>
            </svg>
          </span>
        )}

        <h3>{props.product.name}</h3>

        <div className="">
          <div className="">
            {renderOldPrice()}

            <div className="">
              R$ {(props.product.discount > 0 ? props.product.price - props.product.discount : props.product.price).toFixed(2)}
            </div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => props.handleBuyClick(props.index, props.product)}>
        Comprar
        </button>
 
      </div>
    </div>
  );
};

export default ProductCard;
