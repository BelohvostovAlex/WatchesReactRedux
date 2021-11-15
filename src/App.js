import './scss/index.scss';

import { Card, Header, Drawer } from './components';
import React from 'react';
import axios from 'axios'

function App() {
  const [watches, setWatches] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [cardOpened, setCartOpened] = React.useState(false)


  React.useEffect(() => {
    axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/watches').then(({data}) => {
      console.log('rec')
      return setWatches(data)
    })
  }, [])

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
  }
  console.log(cartItems)

  return (
    <div className="wrapper">
      {cardOpened && <Drawer cartItems={cartItems} onClose={() => setCartOpened(false)}/>}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content">
        <div className="contentTitleBlock">
          <h1 className="contentTitle">All watches</h1>
          <div className="search-block">
            <img width={20} height={20} src="/img/search.png" alt="Search" />
            <input type="text" placeholder="Search.." />
          </div>
        </div>
        <div className="contentInner">
          {watches &&
            watches.map(item => 
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
