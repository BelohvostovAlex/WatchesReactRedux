import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './scss/index.scss';

import AppContext from './context';

import { Header, Drawer } from './components';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Orders from './pages/Orders';


function App() {
  const [watches, setWatches] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [likedItems, setLikedItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cardOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)


  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const [watchesResponse, cartItemsResponse, likedItemsResponse ] = await Promise.all([
          axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/watches'),
          axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/carts'),
          axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/liked')
      ])
        setIsLoading(false)
  
        setCartItems(cartItemsResponse.data)
        setLikedItems(likedItemsResponse.data)
        setWatches(watchesResponse.data)
      } catch (error) {
        alert('Smthng went wrong with fetching data :(')
      }
    }

    fetchData()
  }, []);


  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => item.itemId === obj.itemId)
      if (findItem) {
        setCartItems((prev) => prev.filter(item => item.itemId !== obj.itemId))
        await axios.delete(`https://6192739c57b14a0017c4a0c6.mockapi.io/carts/${findItem.id}`)
      } else {
        let response = await axios.post('https://6192739c57b14a0017c4a0c6.mockapi.io/carts', obj)
        setCartItems((prev) => [...prev, response.data])
      }
    } catch (error) {
      alert('Whoops, didnt add the item to card...')
    }
  };

  const onLikeItems = async (obj) => {
   try {
      if(likedItems.find(item => {
        return item.itemId === obj.itemId})) {
      setLikedItems((prev) => prev.filter((item) => item.itemId !== obj.itemId));
      axios.delete(`https://6192739c57b14a0017c4a0c6.mockapi.io/liked/${obj.id}`);
    } else {
      const { data } =  await axios.post('https://6192739c57b14a0017c4a0c6.mockapi.io/liked', obj);
      setLikedItems((prev) => [...prev, data]);
    }
   } catch (error) {
     alert('Cant add it to favourite list')
     console.error(error)
   }
  };


  const onRemoveFromCart = (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
      axios.delete(`https://6192739c57b14a0017c4a0c6.mockapi.io/carts/${id}`)
    } catch(err) {
      alert('Smthng went wrong with removing item from the cart')
      console.error(err)
    }
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
        <Drawer
          cartItems={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveFromCart}
          opened={cardOpened}
        />
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
        <Route
          path="/orders"
          element={<Orders />}>
        </Route>
      </Routes>
    </div>
    </ AppContext.Provider>
  );
}

export default App;
