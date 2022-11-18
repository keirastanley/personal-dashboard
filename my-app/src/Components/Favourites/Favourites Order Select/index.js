function FavouritesOrder({orderArray}){
    return <select name="favourites-order" onChange={orderArray}>
        <option>Order by</option>
        <option value="name">Name</option>
        <option value="starred">Starred</option>
    </select>
}

export default FavouritesOrder;