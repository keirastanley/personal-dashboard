/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useReducer } from "react";
import { Link } from "react-router-dom";
import FavouritesList from "./Favourites List";
import FavouritesInput from "./Favourites Input";
import { Favourite } from "../../interfaces";
import { initialFavourites } from "./favourites";
import "./index.css";
import {
  TopSection,
  MainContainer,
  Heading3,
  InnerBox,
  ControlsContainer,
  LinkStyled,
  IconButton,
} from "../shared";
import { useOrderBy } from "../../hooks/useOrderBy";
import { TbArrowDown, TbArrowUp } from "react-icons/tb";

function Favourites() {
  const [favourites, setFavourites] = useState<Favourite[]>(initialFavourites);

  const {
    orderBy,
    isAscending,
    onOrderByChange,
    onAscendingClick,
    onDescendingClick,
  } = useOrderBy(favourites, setFavourites);

  return (
    <MainContainer color="#dab9bf">
      <TopSection>
        <Heading3>Favourites</Heading3>
      </TopSection>
      <InnerBox
        css={css`
          select {
            background: #f1e2e5;
            border: 1px solid #969696;
          }
        `}
      >
        <ControlsContainer>
          <select name="favourites-order" onChange={onOrderByChange}>
            <option>Order by</option>
            <option value="name">Name</option>
            <option value="starred">Starred</option>
          </select>
          {orderBy && (
            <IconButton>
              <TbArrowUp
                onClick={onAscendingClick}
                css={css`
                  color: ${isAscending ? "black" : "grey"};
                `}
              />
            </IconButton>
          )}
          {orderBy && (
            <IconButton>
              <TbArrowDown
                onClick={onDescendingClick}
                css={css`
                  color: ${isAscending ? "grey" : "black"};
                `}
              />
            </IconButton>
          )}
          <LinkStyled href="favourites">See all</LinkStyled>
        </ControlsContainer>
        <FavouritesList favourites={favourites} setFavourites={setFavourites} />
        <FavouritesInput
          favourites={favourites}
          setFavourites={setFavourites}
        />
      </InnerBox>
    </MainContainer>
  );
}

export default Favourites;
