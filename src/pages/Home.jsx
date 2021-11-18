import React from 'react'

import { Card } from '../components'


function Home({ 
    watches,
    searchValue,
    onChangeSearchInput,
    onAddToCart,
    onLikeItems,
    isLoading,
}) {

    
    return (
        <div className="content">
        <div className="contentTitleBlock">
          <h1 className="contentTitle">
            {searchValue ? `Searching for:${searchValue}` : 'All watches'}
          </h1>
          <div className="search-block">
            <img width={20} height={20} src="/img/search.png" alt="Search" />
            <input
              onChange={onChangeSearchInput}
              type="text"
              placeholder="Search.."
              value={searchValue}
              maxLength={12}
            />
          </div>
        </div>
        <div className="contentInner">
          {!isLoading && watches ?
            watches
              .filter((watch) => watch.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((item,index) => (
                <Card
                  key={index}
                  onAdd={(obj) => onAddToCart(obj)}
                  onLike={(obj) => onLikeItems(obj)}
                  {...item}
                  isLoading={isLoading}
                />
              ))
            :
            Array(9).fill('1').map((item,index) => <Card
              isLoading={isLoading}
              key={index}
            />)}
        </div>
      </div>
    )
}

export default Home
