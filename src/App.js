import './scss/index.scss';

import { Card, Header, Drawer } from './components';
import React from 'react';
import axios from 'axios'



function App() {
  const [cardOpened, setCartOpened] = React.useState(false)
  const [watches, setWatches] = React.useState([])

  React.useEffect(() => {
    axios.get('http://localhost:3000/db.json').then(({ data }) => {
      return setWatches(data.watches)
    },[])
  })

  return (
    <div className="wrapper">
      {cardOpened && <Drawer onClose={() => setCartOpened(false)}/>}
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
            watches.map((item,index) => <Card key={item.title + index} title={item.title} price={item.price} src={item.src}/>)}
        </div>
      </div>
    </div>
  );
}

export default App;
