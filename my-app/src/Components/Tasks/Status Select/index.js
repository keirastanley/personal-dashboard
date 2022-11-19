export default function StatusSelect({id, status, handleStatus}){
    return <select onChange={handleStatus} className={status} id={id} value={status}>
                <option value="not-started">Not started</option>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
            </select>
}