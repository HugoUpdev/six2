import React, { useState } from 'react';

const FormModal = ({ product, onClose, onSubmit, formData }) => {
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    phone_number: '',
    street_number: '',
    street: '',
    district: '',
    city: '',
    state: '',
    ...formData, 

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!formFields.name || !formFields.email || !formFields.phone_number) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    onSubmit(formFields, product.product_id);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Seu Pedido</h2>
        <h3 className='txtprt'>{product.product_id}. {product.name}: R$ {(product.discount > 0 ? product.price - product.discount : product.price).toFixed(2)}
        </h3>
        <form className='container-form'>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nome: *
          </label>
          <input 
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formFields.name || ''}
            onChange={handleChange}
            placeholder="Nome"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email: *
          </label>
          <input 
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formFields.email || ''}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">
            Telefone: *
          </label>
          <input 
            type="tel"
            className="form-control"
            id="phone_number"
            name="phone_number"
            value={formFields.phone_number || ''}
            onChange={handleChange}
            placeholder="Telefone"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="street" className="form-label">
            Rua:
          </label>
          <input 
            type="text"
            className="form-control"
            id="street"
            name="street"
            value={formFields.street || ''}
            onChange={handleChange}
            placeholder="Rua"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="street_number" className="form-label">
            Número:
          </label>
          <input 
            type="number"
            className="form-control"
            id="street_number"
            name="street_number"
            value={formFields.street_number || ''}
            onChange={handleChange}
            placeholder="Número"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="district" className="form-label">
            Bairro:
          </label>
          <input 
            type="text"
            className="form-control"
            id="district"
            name="district"
            value={formFields.district || ''}
            onChange={handleChange}
            placeholder="Bairro"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            Cidade:
          </label>
          <input 
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formFields.city || ''}
            onChange={handleChange}
            placeholder="Cidade"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            Estado:
          </label>
          <input 
            type="text"
            className="form-control"
            id="state"
            name="state"
            value={formFields.state || ''}
            onChange={handleChange}
            placeholder="Estado"
          />
        </div>

        <div className='container'>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
        </div>



        </form>
      </div>
    </div>
  );
};

export default FormModal;
