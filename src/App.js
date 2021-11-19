import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './scss/index.scss';

import AppContext from './context';

import { Header, Drawer } from './components';
import Home from './pages/Home';
import Favourites from './pages/Favourites';


function App() {
  const [watches, setWatches] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [likedItems, setLikedItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cardOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)


  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const watchesResponse = await axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/watches')
      const cartItemsResponse = await axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/carts')
      const likedItemsResponse = await axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/liked')
      
      setIsLoading(false)

      setCartItems(cartItemsResponse.data)
      setLikedItems(likedItemsResponse.data)
      setWatches(watchesResponse.data)
      
    }

    fetchData()
  }, []);
  console.log(cartItems)


  const onAddToCart = async (obj) => {
    try {
      if(cartItems.find(item => item.itemId === obj.itemId)) {
        console.log('true')
        axios.delete(`https://6192739c57b14a0017c4a0c6.mockapi.io/carts/${obj.id}`)
        setCartItems((prev) => prev.filter(item => item.itemId !== obj.itemId))
      } else {
        let response = await axios.post('https://6192739c57b14a0017c4a0c6.mockapi.io/carts', obj)
        console.log(response)
        setCartItems((prev) => [...prev, response.data]);
      }
    } catch (error) {
      alert('Whoops, didnt add the item to card...')
    }
  };

  const onLikeItems = async (obj) => {
   try {
      if(likedItems.find(item => {
        return item.id === obj.id})) {
      setLikedItems((prev) => prev.filter((item) => item.id !== obj.id));
      axios.delete(`https://6192739c57b14a0017c4a0c6.mockapi.io/liked/${obj.id}`);
    } else {
      const { data } =  await axios.post('https://6192739c57b14a0017c4a0c6.mockapi.io/liked', obj);
      setLikedItems((prev) => [...prev, data]);
    }
   } catch (error) {
     alert('Cant add it to favourite list')
   }
  };


  const onRemoveFromCart = (id) => {
    axios.delete(`https://6192739c57b14a0017c4a0c6.mockapi.io/carts/${id}`)
     setCartItems((prev) => prev.filter((item) => item.id !== id))
    //  onCartSum()
  };


  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (itemId) => {
    return cartItems.some((obj) => +obj.itemId === +itemId)
  }
  

  return (
    <AppContext.Provider value={{ watches, cartItems, setCartItems, likedItems, isItemAdded}}>
    <div className="wrapper">
      {cardOpened && (
        <Drawer
          cartItems={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveFromCart}
        />
      )}
      <Header 
      onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              watches={watches}
              searchValue={searchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToCart={onAddToCart}
              onLikeItems={onLikeItems}
              isLoading={isLoading}
            />
          }></Route>
        <Route 
          path="/favourites" 
          element={
            <Favourites 
              onLikeItems={onLikeItems}
              />} 
          exact>
        </Route>
      </Routes>
    </div>
    </ AppContext.Provider>
  );
}

export default App;
