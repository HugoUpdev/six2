import React from 'react';

const PedidoEnviado = ({ onVoltar }) => {
  const handleVoltarParaPaginaInicial = () => {
    onVoltar();
  };

  return (
    <div className="centered-content">
      <h1>Obrigado por sua compra!</h1>
      <p>Seu pedido foi enviado com sucesso.</p>
      <button className="btn btn-primary" onClick={handleVoltarParaPaginaInicial}>
        Voltar para a Página Inicial
      </button>
    </div>
  );
};

export default PedidoEnviado;
