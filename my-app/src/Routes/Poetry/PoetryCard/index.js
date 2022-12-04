import { v4 as uuidv4 } from 'uuid';

export default function PoetryCard({ poems }) {

    function Poem({poem}) {
        return <>
            <p className="poetryPage-title">{poem.title} by {poem.author}</p>
            <ul className="poetryPage-lines">{poem.lines.map(line => <li key={uuidv4()}>{line}</li>)}</ul>
        </>
    }

    return (
        poems.map(poem => <div className="poetryPage-container" key={uuidv4()}>
            <div className="poetryPage-info">
                <div className="poetryPage-text">
                    <Poem poem={poem}/>
                </div>
                <button className="poetryPage-button">Continue reading</button>
            </div>
        </div>
        ));
}