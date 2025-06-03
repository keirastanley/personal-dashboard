import { Poem } from "@schemas/data";
import { addItem, deleteItem } from "../api";

export const handleHeart = (poem: Poem, isAdded: boolean) => {
  if (isAdded) {
    if (
      window.confirm(
        `Remove ${poem.title} by ${poem.author} from your reading list?`
      )
    ) {
      deleteItem("poems", poem._id).then((response) => {
        if (response.success) {
          window.alert(
            `${poem.title} has been removed from your reading list.`
          );
        }
      });
      return;
    }
  }
  if (
    window.confirm(`Add ${poem.title} by ${poem.author} to your reading list?`)
  ) {
    addItem<Poem>("poems", poem).then((response) => {
      if (response.success) {
        window.alert(`${poem.title} has been added to your reading list.`);
      }
    });
  }
};
