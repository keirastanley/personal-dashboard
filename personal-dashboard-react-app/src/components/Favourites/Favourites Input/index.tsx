import { useState } from "react";
import { Button, InputColumn, InputSectionColumn } from "../../shared";
import { Favourite } from "personal-dashboard-schemas/data";

function FavouritesInput({
  favourites,
  setFavourites,
}: {
  favourites: Favourite[];
  setFavourites: (favourites: Favourite[]) => void;
}) {
  const [newFavourite, setNewFavourite] = useState<
    Pick<Favourite, "name" | "href">
  >({
    name: "",
    href: "",
  });

  return (
    <InputSectionColumn>
      <InputColumn
        type="text"
        placeholder="Enter a link..."
        name="favourites-link"
        onChange={(e) => {
          setNewFavourite({
            ...newFavourite,
            name: e.target.value as string,
          });
        }}
      />
      <InputColumn
        type="text"
        placeholder="Display as.."
        name="favourites-display"
        onChange={(e) => {
          setNewFavourite({
            ...newFavourite,
            href: e.target.value as string,
          });
        }}
      />
      <Button
        onClick={() => {
          setFavourites([...favourites, { ...newFavourite, starred: false }]);
          setNewFavourite({ name: "", href: "" });
        }}
      >
        Add new
      </Button>
    </InputSectionColumn>
  );
}

export default FavouritesInput;
