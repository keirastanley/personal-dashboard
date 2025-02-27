/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import FavouritesList from "./Favourites List";
import FavouritesInput from "./Favourites Input";
import { Favourite } from "@schemas/data";
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
  Select,
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
      <InnerBox>
        <ControlsContainer>
          <Select name="favourites-order" onChange={onOrderByChange}>
            <option>Order by</option>
            <option value="name">Name</option>
            <option value="starred">Starred</option>
          </Select>
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
