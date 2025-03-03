export const getSearchResults = (searchTerm: string, text: string) => {
  const textSplitBySearchTerm = text.split(new RegExp(`(${searchTerm})`, "ig"));
  const numberOfMatches = textSplitBySearchTerm.filter((chunk) =>
    chunk
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace("\n", "")
      .includes(searchTerm.toLowerCase())
  ).length;
  return { textSplitBySearchTerm, numberOfMatches };
};
