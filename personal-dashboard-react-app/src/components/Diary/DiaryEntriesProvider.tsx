import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DiaryEntry, EntryType, MediaType, WithoutId } from "@schemas/data";
import { addItem, getItems } from "../api";

export const DiaryEntriesContext = createContext<{
  entries?: DiaryEntry[];
  setEntries: (entries: DiaryEntry[]) => void;
  entry?: WithoutId<DiaryEntry>;
  setEntry: (entry: WithoutId<DiaryEntry>) => void;
  isAddingNewEntry: boolean;
  setIsAddingNewEntry: (isAddingNewEntry: boolean) => void;
  handleTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMediaTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: () => void;
  filterBy?: MediaType | "text";
  setFilterBy: (filterBy?: MediaType | "text") => void;
}>({
  entries: [],
  setEntries: () => {},
  entry: undefined,
  setEntry: () => {},
  isAddingNewEntry: false,
  setIsAddingNewEntry: () => {},
  handleTypeChange: () => {},
  handleMediaTypeChange: () => {},
  onSubmit: () => {},
  filterBy: undefined,
  setFilterBy: () => {},
});

export const DiaryEntriesContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isAddingNewEntry, setIsAddingNewEntry] = useState(false);
  const [entry, setEntry] = useState<WithoutId<DiaryEntry>>({
    type: EntryType.free,
    title: "",
    text: "",
    date: "",
  });
  const [filterBy, setFilterBy] = useState<MediaType | "text">();

  useEffect(() => {
    getItems<DiaryEntry[]>("diary").then((response) => {
      if (response.success) {
        setEntries(response.payload);
      }
    });
  }, []);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const entryType = e.target.value as EntryType;

    if (entryType === EntryType.log) {
      setEntry({
        type: EntryType.log,
        mediaType: MediaType.film,
        date: entry.date ?? "",
        title: entry.title ?? "",
        year: "",
      });
    }

    if (entryType === EntryType.free) {
      setEntry({
        type: EntryType.free,
        title: entry.title ?? "",
        date: entry.date ?? "",
        text: entry.text ?? "",
      });
    }
  };

  const handleMediaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mediaType = e.target.value as MediaType;
    const baseEntry = {
      type: EntryType.log as const,
      mediaType: MediaType.film as const,
      title: entry.title ?? "",
      date: entry.date ?? "",
      year: "",
    };

    switch (mediaType) {
      case MediaType.film:
        setEntry({ ...baseEntry, mediaType: MediaType.film, year: "" });
        break;
      case MediaType.book:
        setEntry({
          ...baseEntry,
          mediaType: MediaType.book,
          author: "",
        });
        break;
      default:
        setEntry(baseEntry);
        break;
    }
  };

  const onSubmit = () => {
    setIsAddingNewEntry(false);
    addItem<DiaryEntry>(
      "diary",
      !entry.date || entry.date.length > 1
        ? entry
        : {
            ...entry,
            date: new Date()
              .toLocaleDateString()
              .split("/")
              .reverse()
              .join("-"),
          }
    ).then((response) => {
      if (response.success) {
        setEntries((prevEntries) => [...prevEntries, response.payload]);
      }
    });
    setEntry({
      type: EntryType.free,
      title: "",
      text: "",
      date: "",
    });
  };

  return (
    <DiaryEntriesContext.Provider
      value={{
        entries,
        setEntries,
        entry,
        setEntry,
        isAddingNewEntry,
        setIsAddingNewEntry,
        handleTypeChange,
        handleMediaTypeChange,
        onSubmit,
        filterBy,
        setFilterBy,
      }}
    >
      {children}
    </DiaryEntriesContext.Provider>
  );
};

export const useDiaryEntries = () => useContext(DiaryEntriesContext);
