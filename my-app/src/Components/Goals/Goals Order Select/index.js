function GoalsOrderSelect({orderArray}){
    return <select name="goals-order" onChange={orderArray}>
          <option>Order by</option>
          <option value="name">Name</option>
          <option value="starred">Starred</option>
          <option value="progress">Progress</option>
        </select>
}

export default GoalsOrderSelect;