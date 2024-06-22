import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { useState } from 'react'

import Catalog from './components/Catalog'
import Cart from './components/Cart'
import ThankYouPage from './components/ThankYouPage'

import { ToastContainer, toast } from 'react-toastify'

import "react-toastify/ReactToastify.css"

function App() {
  const [cartItems, setCartItems] = useState([])

  const handleAddCart = (product, quantity) => {
    setCartItems((prevItems) => {
      //se não existir, adiciona o item
      //se existir, incrementa a quantidade
      

      const itemExists = prevItems.find((item) => item.id === product.id)

      if(itemExists){
        toast.info(`Quantidade do item ${product.name} atualizada.`)
        return prevItems.map((item) => item.id === product.id? {...item, quantity: item.quantity + quantity} : item)
      }
      else{
        toast.success(`${product.name} adicionado com sucesso!`)
        return [...prevItems, {...product, quantity}]
      }

    })
  }

  const handleUpdateCart = (product, quantity) => {
    toast.info(`Quantidade do item ${product.name} atualiada.`)
    setCartItems((prevItems) => {
      return prevItems.map((item) => item.id === product.id ? {...item, quantity: +quantity} : item)
    })

  }

  const handleRemoveFromCart = (product) => {
    toast.error(`${product.name} foi removido com sucesso do seu carrinho`)
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== product.id))
  }

  return (
  <BrowserRouter>
    <nav>
      <Link to="/">Catálogo</Link>
      <Link to="/cart">Carrinho</Link>
    </nav>
    <div className="container">
      <Routes>
        <Route path="/" element={<Catalog onAddToCart={handleAddCart}/>}/>
        <Route path="/cart" element={<Cart 
        cartItems={cartItems} 
        onUpdateCart={handleUpdateCart} 
        onRemoveFromCart={handleRemoveFromCart}
        setCartItems={setCartItems}
        onCheckout={() => {
          if(cartItems.length > 0){
            toast.success("Compra realizada com sucesso")
            setCartItems([])
          }
          else{
            toast.error(`Seu carrinho está vazio!`)
          }
        }}
        />}/>
        <Route path="/thank-you" element={<ThankYouPage/>}/>
      </Routes>
    </div>
    <ToastContainer 
    position="top-center"
    autoClose={1500}
    hideProgressBar={false}
    closeButton
    pauseOnFocusLoss
    pauseOnHover
    />

  </BrowserRouter>
  )  
}

export default App
