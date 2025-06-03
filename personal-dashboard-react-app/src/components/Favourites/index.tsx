/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import FavouritesList from "./Favourites List";
import FavouritesInput from "./Favourites Input";
import { Favourite } from "@schemas/data";
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
import { ArrowDown, ArrowUp } from "../icons";
import { getItems } from "../api";
import { pages } from "../../constants";

function Favourites() {
  const [favourites, setFavourites] = useState<Favourite[]>([]);

  useEffect(() => {
    getItems<Favourite[]>("favourites").then((response) => {
      if (response.success) {
        setFavourites(response.payload);
      }
    });
  }, []);

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
            <IconButton onClick={onAscendingClick}>
              <ArrowUp
                css={css`
                  color: ${isAscending ? "black" : "grey"};
                `}
              />
            </IconButton>
          )}
          {orderBy && (
            <IconButton onClick={onDescendingClick}>
              <ArrowDown
                css={css`
                  color: ${isAscending ? "grey" : "black"};
                `}
              />
            </IconButton>
          )}
          <LinkStyled href={pages.favourites}>See all</LinkStyled>
        </ControlsContainer>
        <FavouritesList favourites={favourites} setFavourites={setFavourites} />
        <FavouritesInput setFavourites={setFavourites} />
      </InnerBox>
    </MainContainer>
  );
}

export default Favourites;
