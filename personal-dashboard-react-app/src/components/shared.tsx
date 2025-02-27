/** @jsxImportSource @emotion/react */
import { css, Interpolation, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { ComponentProps, HTMLAttributes } from "react";
import { IoStarSharp } from "react-icons/io5";
import { useEditText } from "../hooks/useEditText";
import { ObjectId } from "@schemas/data";

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
`;

export const TopSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: calc(100% - 2px);
  padding: 10px 0px 10px 0px;
  gap: 10px;
`;

export const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 10px 10px 10px;
  background-color: ${({ color }) => color};
  overflow-y: hidden;
  overflow-x: hidden;
  height: 100%;
  justify-content: space-between;
`;

export const ControlsContainer = styled.div`
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
`;

export const ControlsContainerColumn = styled(ControlsContainer)`
  background-color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: calc(100% - 5px);
  height: calc(100% - 5px);
  padding: 0px;
`;

type IconButtonProps = HTMLAttributes<HTMLButtonElement> & {
  fontSize?: string;
};

export const IconButton = styled.button`
  display: flex;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: ${({ fontSize }: IconButtonProps) => fontSize ?? "18px"};
`;

export const Heading1 = styled.h1`
  padding: 0px;
  margin: 0px;
`;

export const Heading2 = styled.h2`
  padding: 0px;
  margin: 0px;
`;

export const Heading3 = styled.h3`
  padding: 0px;
  margin: 0px;
`;

export const ListItemsContainer = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    css={css`
      overflow-y: auto;
      max-height: 100%;
      height: 100%;
      padding: 5px 10px 10px 10px;
    `}
    {...props}
  >
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        gap: 8px;
        list-style-type: none;
        padding: 0;
        margin: 0;
        width: 100%;
      `}
    >
      {children}
    </ul>
  </div>
);

export const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
  width: calc(100% - 5px);
`;

interface ListItemSideProps {
  width?: number | string;
}

export const ListItemLeft = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 5px;
  width: ${({ width }: ListItemSideProps) => width ?? "50%"};
`;

export const ListItemRight = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  width: ${({ width }: ListItemSideProps) => width ?? "50%"};
`;

export const InputSectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

export const InputSectionRow = styled(InputSectionColumn)`
  flex-direction: row;
  align-items: center;
  padding: 0px;
`;

export const InputColumn = styled.input`
  width: 100%;
`;

export const Button = styled.button`
  background-color: #f9dfdf;
  width: 62px;
  align-self: center;
`;

type StarIconProps = ComponentProps<typeof IoStarSharp> & { starred: boolean };

export const StarIcon = styled(IoStarSharp)`
  color: ${({ starred }: StarIconProps) => (starred ? "#d9d9d9" : "white")};
  font-size: 18px;
  path {
    stroke: ${({ starred }: StarIconProps) =>
      starred ? "#0085ff" : "#818181"};
    stroke-width: 30px;
  }
`;

type LinkStyledProps = HTMLAttributes<HTMLAnchorElement> & {
  fontSize?: string;
};

export const LinkStyled = styled.a`
  font-size: ${({ fontSize }: LinkStyledProps) => fontSize ?? "12px"};
  color: black;
`;

export const WidgetPageWrapper = styled.div`
  padding: 20px 200px 20px 200px;
  height: calc(100vh - 40px);
`;

export const Select = styled.select`
  background: #f1e2e5;
  border: 1px solid #969696;
`;

export function EditableTextInput({
  id,
  textValue,
  onBlur,
  textElementCss,
}: {
  id: ObjectId;
  textValue: string;
  onBlur: () => void;
  textElementCss: Interpolation<Theme>;
}) {
  const {
    updatedName,
    shouldShowInput,
    inputRef,
    onInputChange,
    onInputKeyDown,
    onInputBlur,
    onTextElementClick,
  } = useEditText(id, onBlur);

  return shouldShowInput ? (
    <input
      autoFocus
      ref={inputRef}
      value={updatedName ?? textValue}
      onChange={onInputChange}
      onKeyDown={onInputKeyDown}
      onBlur={onInputBlur}
    />
  ) : (
    <span css={textElementCss} onClick={onTextElementClick}>
      {textValue}
    </span>
  );
}
