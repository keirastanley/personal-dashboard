import { Dispatch, SetStateAction, useState } from "react";
import { Button, Input, InputSectionColumn } from "../../shared";
import { Favourite } from "@schemas/data";
import { addItem } from "../../api";

function FavouritesInput({
  setFavourites,
}: {
  setFavourites: Dispatch<SetStateAction<Favourite[]>>;
}) {
  const [newFavourite, setNewFavourite] = useState<
    Pick<Favourite, "name" | "href">
  >({
    name: "",
    href: "",
  });

  return (
    <InputSectionColumn>
      <Input
        type="text"
        placeholder="Enter a link..."
        name="favourites-link"
        onChange={(e) => {
          setNewFavourite({
            ...newFavourite,
            href: e.target.value as string,
          });
        }}
      />
      <Input
        type="text"
        placeholder="Display as..."
        name="favourites-display"
        onChange={(e) => {
          setNewFavourite({
            ...newFavourite,
            name: e.target.value as string,
          });
        }}
      />
      <Button
        onClick={() => {
          addItem<Favourite>("favourites", {
            ...newFavourite,
            starred: false,
          }).then((response) => {
            if (response.success) {
              setFavourites((prevTasks) => [...prevTasks, response.payload]);
            }
          });
        }}
      >
        Add new
      </Button>
    </InputSectionColumn>
  );
}

export default FavouritesInput;
