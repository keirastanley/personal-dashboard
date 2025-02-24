/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { IoStarSharp } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import {
  IconButton,
  LinkStyled,
  ListItem,
  ListItemLeft,
  ListItemRight,
  ListItemsContainer,
  StarIcon,
} from "../../shared";
import { Favourite } from "../../../../schemas/data";

function FavouritesList({
  favourites,
  setFavourites,
}: {
  favourites: Favourite[];
  setFavourites: (favourites: Favourite[]) => void;
}) {
  return (
    <ListItemsContainer>
      {favourites.map((favourite, i) => (
        <ListItem key={favourite.name + i}>
          <ListItemLeft width="80%">
            <IconButton
              onClick={() => {
                setFavourites([
                  ...favourites.slice(0, i),
                  { ...favourite, starred: true },
                  ...favourites.slice(i + 1),
                ]);
              }}
            >
              <StarIcon starred={favourite.starred} />
            </IconButton>
            <LinkStyled href={favourite.href} fontSize="16px">
              {favourite.name}
            </LinkStyled>
          </ListItemLeft>
          <ListItemRight width="20%">
            <IconButton
              onClick={() => {
                if (
                  window.confirm(`Do you want to delete '${favourite.name}'?`)
                ) {
                  setFavourites([
                    ...favourites.slice(0, i),
                    ...favourites.slice(i + 1),
                  ]);
                }
              }}
            >
              <RiDeleteBinLine />
            </IconButton>
          </ListItemRight>
        </ListItem>
      ))}
    </ListItemsContainer>
  );
}

export default FavouritesList;
