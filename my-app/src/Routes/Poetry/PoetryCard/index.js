import Poetry from "../../../Components/Poetry";
import poems from "../../../Components/Poetry/poems";

export default function PoetryCard(){
    return poems.map((poem, index) => <div className="poetryCard"><Poetry className="poetryPage" index={index}/></div>);
}