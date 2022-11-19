export default function TaskOrderSelect({orderArray}){
    return <select name="tasks-order" onChange={orderArray}>
            <option>Order by</option>
            <option value="name">Name</option>
            <option value="priority">Priority</option>
            <option value="deadline">Deadline</option>
            <option value="status">Status</option>
          </select>
}