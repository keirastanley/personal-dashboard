import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function PoetryCard({ poems, handleDelete }) {

    console.log("Poems", poems)

function Poem({ poem }) {
return (
    <>
    <p className="poetryPage-title">
        {poem.title} by {poem.author}
    </p>
    <ul className="poetryPage-lines">
        {poem.lines.map((line) => (
        <li key={uuidv4()}>{line}</li>
        ))}
    </ul>
    </>
);
}

return poems.length > 0 ?
<div className="poetryPage-card-container">{poems.map(poem => (
    <div className="poetryPage-card" key={uuidv4()}>
        <div className="poetryPage-text">
        <Poem poem={poem} />
        </div>
        <div className="poetryPage-buttons">
            {/* <button className="poetryPage-button">Continue reading</button> */}
            <button className="poetryPage-button" name={poem.title} id={poem.id} onClick={handleDelete}>Remove</button>
        </div>
    </div>
))}</div> : (
<div className="poetryPage-card">
    <div className="poetryPage-info">
    <div className="poetryPage-text">
        <p>Loading...</p>
    </div>
    </div>
</div>
);
}
