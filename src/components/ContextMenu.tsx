import Card from "@mui/material/Card";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";

interface ContextMenuProps {
  children: React.ReactNode;
  menuComponent: React.ReactNode;
}

export default function ContextMenu({
  children,
  menuComponent,
}: ContextMenuProps) {
  const ref = useRef(null);

  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [open, setOpen] = useState(false);
  useClickAway(ref, () => {
    setOpen(false);
  });
  const { left, top } = position;

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
    <>
      <div
        onContextMenu={(e) => {
          const { clientX, clientY } = e;
          setPosition({ left: clientX, top: clientY });
          setOpen(true);
        }}
      >
        {children}
      </div>
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
        {menuComponent}
      </Card>
    </>
  );
}
