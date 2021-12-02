import React from 'react';

import axios from 'axios';

import { Card } from '../components';

function Orders() {
  const [isOrder, setOrder] = React.useState([])
  const [isLoading, setIsloading] = React.useState(true)

  React.useEffect(() => {
    try {
      async function getOrders() {
        let { data } = await axios.get('https://6192739c57b14a0017c4a0c6.mockapi.io/order')
        setOrder(data.reduce((prev, curr) => [...prev, ...curr.items], []),)
        setIsloading(false)
      }
      getOrders()
    } catch (error) {
      alert('Whoops, smthng went wrong with order list')
      console.error(error)
    }
  }, [])

  return (
    <div className="content">
      <div className="contentTitleBlock">
        <h1 className="contentTitle">My orders</h1>
      </div>
      <div className="contentInner">
        {!isLoading 
          && isOrder 
          ? isOrder.map((item,i) => (
          <Card 
          key={i} 
          {...item} 
          isOrder={isOrder} 
          isLoading={isLoading} 
          />
        ))
        :
        Array(8).fill('1').map((item,index) => <Card
          isLoading={isLoading}
          key={index}
        />)}
      </div>
    </div>
  );
}

export default Orders;
