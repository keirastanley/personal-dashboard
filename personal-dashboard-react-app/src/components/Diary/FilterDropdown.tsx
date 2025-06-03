/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MediaType } from "@schemas/data";
import { pages } from "../../constants";
import { ControlsContainer, LinkStyled } from "../shared";
import { useDiaryEntries } from "./DiaryEntriesProvider";
import { useLocation } from "react-router";

export const FilterDropdown = () => {
  const { filterBy, setFilterBy } = useDiaryEntries();
  const { pathname } = useLocation();

  return (
    <ControlsContainer
      css={css`
        padding: 0;
      `}
    >
      <fieldset
        css={css`
          display: flex;
          flex-direction: row;
          border: none;
          font-size: 12px;
          gap: 5px;
          padding: 0;
        `}
      >
        Filter by:
        {["text", MediaType.book, MediaType.film].map((mediaType) => (
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 5px;
              height: max-content;
            `}
          >
            <input
              type="radio"
              name={mediaType}
              value={mediaType}
              css={css`
                margin: 0;
              `}
              checked={filterBy === mediaType}
              onChange={(e) =>
                setFilterBy(e.target.value as MediaType | "text")
              }
            />
            <label htmlFor={mediaType}>
              {mediaType.slice(0, 1).toUpperCase()}
              {mediaType.slice(1)}
            </label>
          </div>
        ))}
      </fieldset>
      {pathname !== "/diary" && (
        <LinkStyled href={pages.diary}>See all</LinkStyled>
      )}
    </ControlsContainer>
  );
};
