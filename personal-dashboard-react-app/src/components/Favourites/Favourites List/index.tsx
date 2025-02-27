/** @jsxImportSource @emotion/react */
import { RiDeleteBinLine } from "react-icons/ri";
import {
  IconButton,
  LinkStyled,
  ListItem,
  ListItemLeft,
  ListItemRight,
  ListItemsContainer,
  StarIcon,
} from "../../shared";
import { Favourite } from "@schemas/data";
import { Dispatch, SetStateAction } from "react";
import { editItem } from "../../api";

function FavouritesList({
  favourites,
  setFavourites,
}: {
  favourites: Favourite[];
  setFavourites: Dispatch<SetStateAction<Favourite[]>>;
}) {
  return (
    <ListItemsContainer>
      {favourites.map((favourite, i) => (
        <ListItem key={favourite.name + i}>
          <ListItemLeft width="80%">
            <IconButton
              onClick={() => {
                editItem<Pick<Favourite, "starred">, Favourite>(
                  "favourites",
                  favourite._id,
                  {
                    starred: !favourite.starred,
                  }
                ).then((response) => {
                  if (response.success) {
                    setFavourites((prevFavourites) => [
                      ...prevFavourites.slice(0, i),
                      response.payload,
                      ...prevFavourites.slice(i + 1),
                    ]);
                  }
                });
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
