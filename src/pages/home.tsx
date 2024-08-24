import INITIAL_USER_INFO from "@/constants/INITIAL_USER_INFO";
import USER_INFO_DIR from "@/constants/USER_INFO_DIR";
import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  useEffect(() => {
    const content = JSON.stringify(INITIAL_USER_INFO);
    window.fs
      ?.sendMessage({
        type: "read-file",
        dir: USER_INFO_DIR,
        content,
      })
      .then((value) => setText(value as string));
  }, []);

  return (
    <div>
      <div>Home</div>
      <div>{text}</div>
    </div>
  );
}
