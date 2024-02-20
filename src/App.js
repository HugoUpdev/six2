import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import FormModal from './FormModal';
import PedidoEnviado from './PedidoEnviado';

const App = () => {
  const [apiData, setApiData] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const userToken = '32CDF13C-8FA2-432D-86CA-AD173D523F53';
  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState(false);
  const [VOK] = useState(1);

  const resetAppState = () => {
    setFormSubmittedSuccessfully(false);
  };

  useEffect(() => {
    const apiUrl = 'https://api-candidate.ogruposix.com/checkout/95BD9233-8FDC-48AD-B4C5-E5BAF7578C15';

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'user-token': userToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setApiData(data);
          setConnected(true);
        } else {
          setConnected(false);
        }
      } catch (error) {
        console.error('Error connecting to API:', error);
        setConnected(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (selectedIndex, selectedProduct) => {
    setSelectedProductIndex(selectedIndex);
    setSelectedProduct(selectedProduct);  
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProductIndex(null);
    setIsModalOpen(false);
  };

  const handleSubmitForm = async (formData, productId) => {

    try {
      const response = await fetch(`https://api-candidate.ogruposix.com/buy/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-token': userToken,
        },
        body: JSON.stringify(formData),
      });

       if (response.ok) {
  //    if (VOK=1) {
        setFormSubmittedSuccessfully(true);
      } else {
        alert('Erro ao enviar o formulário:', response.status, response.statusText);
      }
    } catch (error) {
      alert('Erro na requisição para a API:', error);
    } finally {
      closeModal(); 
    }
  };

  return (
    <div>
    {connected ? (
      <div>
        {formSubmittedSuccessfully ? (
            <PedidoEnviado onVoltar={resetAppState} />
        ) : (
          <div>
            {apiData && (
              <div>
                <div className="topo">
                <h1>{apiData.object[0].video_headline}</h1>

                <div className="container">
                  <iframe
                    className='video mx-auto'
                    src={apiData.object[0].video_url.replace("https://youtu.be/", "https://youtube.com/embed/") + '?autoplay=1'}
                    frameborder="0"
                    allow="autoplay;"
                  ></iframe>
                </div>

                <h4>{apiData.object[0].video_sub_headline}</h4>
              </div>

              <div className='bgbco'>
                <h2>Nossos Produtos</h2>
                <div className='card-container'>
                  {apiData.object[0].products.map((product, index) => (
                    <ProductCard
                      key={product.product_id}
                      product={product}
                      index={index}
                      handleBuyClick={openModal}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    ) : (
      <p>Falha ao conectar à API. Verifique sua conexão ou parâmetros de autenticação.</p>
    )}


      {isModalOpen && selectedProductIndex !== null && (
        <FormModal
          key={selectedProductIndex}
          product={selectedProduct}
          onClose={closeModal}
          onSubmit={handleSubmitForm}
        />
      )}

    </div>
  );
};
export default App; 
