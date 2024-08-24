import { useState } from "react";

export const STATUS = {
  HOVERED: "hovered",
  NORMAL: "normal",
};

export default function Link({
  page,
  children,
}: {
  page: string;
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  const style = { color: status === STATUS.HOVERED ? "red" : "blue" };
  return (
    <a
      style={style}
      className={status}
      href={page || "#"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}
