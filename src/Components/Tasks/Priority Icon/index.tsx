/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FaCircle, FaExclamation } from "react-icons/fa";
import { Task } from "../../../interfaces";

function PriorityIcon({ priority }: { priority?: Task["priority"] }) {
  switch (priority) {
    case "Low":
      return (
        <FaCircle
          css={css`
            font-size: 10px;
            color: white;
            stroke: #818181;
            stroke-width: 30px;
          `}
        />
      );
    case "Medium":
      return (
        <FaCircle
          css={css`
            font-size: 10px;
            color: #ffb265;
          `}
        />
      );
    case "High":
      return (
        <FaExclamation
          css={css`
            font-size: 10px;
            color: red;
            justify-self: flex-start;
            width: 10px;
          `}
        />
      );
    default:
      return null;
  }
}

export default PriorityIcon;
