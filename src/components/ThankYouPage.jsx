import { useLocation, useNavigate } from "react-router-dom"


const ThankYouPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const items = location.state.cartItems;
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)


  return (
  <div className="thank-you-page">
    <h3>Obrigado pela compra dos seguintes itens.</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x R$ {(item.price).toFixed(2)} 
          </li>
        ))}
      </ul>
      <p>Valor total da Compra: R$ {totalPrice.toFixed(2)}</p>
      <button onClick={() => navigate("/")}>Voltar ao Catálogo</button>
    </div>
  )
}

export default ThankYouPage