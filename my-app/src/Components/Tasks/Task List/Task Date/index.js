export default function TaskDate({deadline}){
    const dateFormat = deadline.split("-").reverse().toString().replaceAll(",", "/")
    return <p className="deadline">{dateFormat}</p>
}