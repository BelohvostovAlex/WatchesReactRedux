import './scss/index.scss';

import { Card, Header, Drawer } from './components';
import React from 'react';
import axios from 'axios'

function App() {
  const [watches, setWatches] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cardOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/watches').then(({data}) => {
      return setWatches(data)
    })
    axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/carts').then(({data}) => {
      return setCartItems(data)
    })
  }, [])

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
    axios.post('https://6192739c57b14a0017c4a0c6.mockapi.io/carts', obj)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const onRemoveFromCart = (id) => {
    axios.delete(`https://6192739c57b14a0017c4a0c6.mockapi.io/carts/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }
  
  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }
  console.log(searchValue)

  return (
    <div className="wrapper">
      {cardOpened && 
        <Drawer 
        cartItems={cartItems} 
        onClose={() => setCartOpened(false)}
        onRemove={onRemoveFromCart}
        />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content">
        <div className="contentTitleBlock">
          <h1 className="contentTitle">{searchValue ? `Searching for:${searchValue}` : 'All watches'}</h1>
          <div className="search-block">
            <img width={20} height={20} src="/img/search.png" alt="Search" />
            <input
            onChange={onChangeSearchInput} 
            type="text" 
            placeholder="Search.." 
            value={searchValue}
            maxLength={12}/>
          </div>
        </div>
        <div className="contentInner">
          {watches &&
            watches.filter(watch => watch.title.toLowerCase().includes(searchValue.toLowerCase())).map(item => 
            <Card 
            key={item.id} 
            title={item.title} 
            price={item.price} 
            src={item.src}
            onAdd={(obj) => onAddToCart(obj)}
            onFfavourite={1}/>)}
        </div>
      </div>
    </div>
  );
}


export default App;
