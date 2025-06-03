/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  ChangeEvent,
  ComponentProps,
  DialogHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoStarSharp } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { EditIcon } from "./icons";

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
  gap: ${({ gap }: { gap?: string }) => gap ?? "10px"};
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
  align-items: center;
  gap: 10px;
  padding: 10px;
`;

export const InputSectionRow = styled(InputSectionColumn)`
  flex-direction: row;
  align-items: center;
  padding: 0px;
`;

export const Button = styled.button`
  background-color: #f9dfdf;
  width: max-content;
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

export const Input = styled.input`
  width: 180px;
`;

interface EditableTextInputProps extends PropsWithChildren {
  // id: ObjectId;
  textValue: string;
  onBlur: (updatedName?: string) => void;
  setIsEditingSiblingInput?: (isEditingSiblingInput: boolean) => void;
  crossThroughText?: boolean;
}

export const EditableTextInput = ({
  textValue,
  onBlur,
  setIsEditingSiblingInput,
  crossThroughText,
}: EditableTextInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUpdatedName(e.target.value);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  const onInputBlur = () => {
    if (updatedName) {
      onBlur(updatedName);
    }
    setIsEditing(false);
  };

  return isEditing ? (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 5px;
      `}
    >
      <input
        autoFocus
        ref={inputRef}
        value={updatedName ?? textValue}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        onBlur={onInputBlur}
      />
      <IconButton
        onClick={() => {
          setIsEditing(false);
          if (setIsEditingSiblingInput) {
            setIsEditingSiblingInput(false);
          }
        }}
      >
        <MdDone />
      </IconButton>
    </div>
  ) : (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 5px;
      `}
    >
      <span
        css={css`
          ${crossThroughText &&
          css`
            text-decoration: line-through;
          `};
        `}
      >
        {textValue}
      </span>
      <IconButton
        onClick={() => {
          setIsEditing(true);
          if (setIsEditingSiblingInput) {
            setIsEditingSiblingInput(true);
          }
        }}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
};

export const EditableLinkInput = ({
  isEditing,
  displayText,
  href,
  onDisplayTextBlur,
  onHrefBlur,
  crossThroughText,
}: {
  isEditing?: boolean;
  displayText: string;
  href?: string;
  onDisplayTextBlur: (updatedDisplayText?: string) => void;
  onHrefBlur: (updatedHref?: string) => void;
  crossThroughText?: boolean;
}) => {
  const [isEditingDisplayText, setIsEditingDisplayText] = useState(false);
  const [updatedDisplayText, setUpdatedDisplayText] = useState<string>();
  const displayTextInputRef = useRef<HTMLInputElement>(null);
  const [isEditingHref, setIsEditingHref] = useState(false);
  const [updatedHref, setUpdatedHref] = useState<string>();
  const hrefInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: 5px;
      `}
    >
      {isEditing && isEditingDisplayText && (
        <input
          autoFocus
          ref={displayTextInputRef}
          value={updatedDisplayText ?? displayText}
          onChange={(e) => setUpdatedDisplayText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              hrefInputRef.current?.focus();
            }
          }}
        />
      )}
      {isEditing && isEditingHref ? (
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 5px;
          `}
        >
          <input
            ref={hrefInputRef}
            placeholder="(Optional) Enter a link"
            value={updatedHref ?? href}
            onChange={(e) => setUpdatedHref(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                hrefInputRef.current?.blur();
              }
            }}
            onBlur={() => {
              if (updatedDisplayText) {
                onDisplayTextBlur(updatedDisplayText);
              }
              if (updatedHref) {
                onHrefBlur(updatedHref);
              }
              setIsEditingHref(false);
              setIsEditingDisplayText(false);
            }}
          />
          <IconButton
            onClick={() => {
              setIsEditingHref(false);
              setIsEditingDisplayText(false);
            }}
          >
            <MdDone
              onClick={() => {
                setIsEditingHref(false);
                setIsEditingDisplayText(false);
              }}
            />
          </IconButton>
        </div>
      ) : (
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 5px;
          `}
        >
          <a href={href}>
            <span
              css={css`
                ${crossThroughText &&
                css`
                  text-decoration: line-through;
                `};
              `}
            >
              {displayText}
            </span>
          </a>
          {isEditing && (
            <IconButton
              onClick={() => {
                setIsEditingHref(true);
                setIsEditingDisplayText(true);
              }}
            >
              <EditIcon />
            </IconButton>
          )}
        </div>
      )}
    </div>
  );
};

export const HighlightedText = styled.span`
  background-color: #f6f699;
`;

export const Label = styled.div`
  padding: 2px;
  border-radius: 5px;
  font-size: 8px;
  width: 30px;
  text-align: center;
  background-color: ${({ color }: { color: string }) => color};
`;

export const Dialog = ({
  open,
  children,
  height,
  width,
}: DialogHTMLAttributes<HTMLDialogElement> & {
  height?: string;
  width?: string;
}) => (
  <div
    css={css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(128, 128, 128, 0.5);
      display: ${open ? "block" : "none"};
    `}
  >
    <dialog
      open={open}
      css={css`
        position: fixed;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);
        height: ${height ?? "350px"};
        width: ${width ?? "600px"};
        background-color: white;
      `}
    >
      {children}
    </dialog>
  </div>
);
