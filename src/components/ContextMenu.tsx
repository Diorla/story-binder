import Card from "@mui/material/Card";
import { useRef } from "react";
import { useClickAway } from "react-use";

interface ContextMenuProps {
  left: number;
  top: number;
  open: boolean;
  closeContextMenu: () => void;
  children: React.ReactNode;
}

/**
 * @example onContextMenu={(e) => {
    const { clientX, clientY } = e;
    setPosition({ left: clientX, top: clientY });
    setOpen(true);
  }}
 */
export default function ContextMenu({
  left,
  top,
  open,
  closeContextMenu,
  children,
}: ContextMenuProps) {
  const ref = useRef(null);

  useClickAway(ref, () => {
    closeContextMenu();
  });

  const availHeight = window.innerHeight;
  const availWidth = window.innerWidth;
  const midHeight = availHeight / 2;
  const midWidth = availWidth / 2;
  const isLeft = midWidth > left;
  const isTop = midHeight > top;
  const style: { [key: string]: number } = {};

  if (!isLeft) {
    style["right"] = availWidth - left;
  } else {
    style["left"] = left;
  }
  if (!isTop) {
    style["bottom"] = availHeight - top;
  } else {
    style["top"] = top;
  }

  return (
    <Card
      ref={ref}
      style={{
        position: "fixed",
        width: 200,
        display: open ? "block" : "none",
        zIndex: 9999,
        ...style,
      }}
    >
      {children}
    </Card>
  );
}
