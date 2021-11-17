import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/index.scss';

import { Header, Drawer } from './components';
import Home from './pages/Home';
import axios from 'axios';
import Favourites from './pages/Favourites';

function App() {
  const [watches, setWatches] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [likedItems, setLikedItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cardOpened, setCartOpened] = React.useState(false);
  const [sum, setSum] = React.useState(0)

  React.useEffect(() => {
    axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/watches').then(({ data }) => {
      return setWatches(data);
    });
    axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/carts').then(({ data }) => {
      return setCartItems(data);
    });
    axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/liked').then(({ data }) => {
      return setLikedItems(data);
    });
  }, []);

  const onAddToCart = async (obj) => {
    let response = await axios.post('https://6192739c57b14a0017c4a0c6.mockapi.io/carts', obj)
console.log(response)
      setCartItems((prev) => [...prev, response.data]);
      onCartSum()
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
     onCartSum()
  };

  const onCartSum = () => {
    setSum(cartItems.reduce((acc,item) => acc + item.price,0))
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="wrapper">
      {cardOpened && (
        <Drawer
          cartItems={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveFromCart}
          sum={sum}
        />
      )}
      <Header 
      onClickCart={() => setCartOpened(true)} 
      sum={sum}/>
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
            />
          }></Route>
        <Route 
          path="/favourites" 
          element={
            <Favourites 
              likedItems={likedItems} 
              onLikeItems={onLikeItems}
              />} 
          exact>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
