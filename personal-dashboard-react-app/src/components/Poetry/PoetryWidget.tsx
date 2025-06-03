/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from "react";
import { ObjectId, Poem } from "@schemas/data";
import { addItem, getItem } from "../api";
import { PoetryDisplay } from "./PoetryDisplay";
import { PoetryControls } from "./PoetryControls";
import { PoetryMainWrapper } from "./PoetryMainWrapper";

function Poetry() {
  const [toggle, setToggle] = useState(false);
  const [randomPoem, setRandomPoem] = useState<Poem>();
  const [addedPoem, setAddedPoem] = useState<Poem>();

  const fetchPoem = () => {
    const poemOnLoad = localStorage.getItem("poemOnLoad");
    if (poemOnLoad) {
      return JSON.parse(poemOnLoad);
    }
    fetch("https://poetrydb.org/random").then((response) => {
      response.json().then((data) => {
        localStorage.setItem("poemOnLoad", JSON.stringify(data[0]));
        return data[0];
      });
    });
  };

  const getNewPoem = () => {
    const newPoem = fetchPoem();
    setRandomPoem(newPoem);
  };

  useEffect(() => {
    getNewPoem();
  }, []);

  // function handleHeart() {
  //   if (
  //     randomPoem &&
  //     window.confirm(
  //       `Add ${randomPoem?.title} by ${randomPoem?.author} to your reading list?`
  //     )
  //   ) {
  //     addItem<Poem>("poems", randomPoem).then((response) => {
  //       if (response.success) {
  //         setAddedPoem(response.payload);
  //       }
  //     });
  //   }
  // }

  useEffect(() => {
    if (addedPoem) {
      window.alert(`${addedPoem.title} has been added to your reading list.`);
    }
  }, [addedPoem]);

  return (
    <PoetryMainWrapper>
      {randomPoem && (
        <>
          <PoetryDisplay poem={randomPoem} />
          <PoetryControls
            controls={[
              { type: "save", poem: randomPoem },
              { type: "navigateToPoems" },
              {
                type: "refresh",
                onClick: () => {
                  setToggle(false);
                  localStorage.removeItem("poemOnLoad");
                  getNewPoem();
                },
              },
            ]}
          />
        </>
      )}
    </PoetryMainWrapper>
  );
}

export default Poetry;
