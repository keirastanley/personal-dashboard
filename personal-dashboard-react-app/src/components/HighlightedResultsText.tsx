import { HighlightedText } from "./shared";
import parse from "html-react-parser";

export const HighlightedResultsText = ({
  searchTerm,
  textSplitBySearchTerm,
}: {
  searchTerm: string;
  textSplitBySearchTerm: string[];
}) => {
  console.log(searchTerm);
  return (
    <>
      {textSplitBySearchTerm.map((chunk) => {
        if (
          chunk
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .replace("\n", "") === searchTerm.toLowerCase()
        ) {
          return <HighlightedText>{parse(chunk)}</HighlightedText>;
        }
        return parse(chunk);
      })}
    </>
  );
};
