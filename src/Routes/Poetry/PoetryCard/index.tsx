import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type PoemType = { id: string; title: string; author: string; lines: string[] };

export default function PoetryCard({
  poems,
  handleDelete,
}: {
  poems: PoemType[];
  handleDelete: () => void;
}) {
  function Poem({ poem }: { poem: PoemType }) {
    return (
      <>
        <p className="poetryPage-title">
          {poem.title} by {poem.author}
        </p>
        <ul className="poetryPage-lines">
          {poem.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </>
    );
  }

  return poems.length > 0 ? (
    <div className="poetryPage-card-container">
      {poems.map((poem) => (
        <div className="poetryPage-card" key={poem.title}>
          <div className="poetryPage-text">
            <Poem poem={poem} />
          </div>
          <div className="poetryPage-buttons">
            {/* <button className="poetryPage-button">Continue reading</button> */}
            <button
              className="poetryPage-button"
              name={poem.title}
              id={poem.id}
              onClick={handleDelete}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="poetryPage-card">
      <div className="poetryPage-info">
        <div className="poetryPage-text">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
}
