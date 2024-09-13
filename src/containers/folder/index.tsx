import { Box } from "@mui/material";
import FolderView from "./FolderView";
import { useEffect } from "react";
import useRouter from "@/context/router/useRouter";
import useApp from "@/context/app/useApp";
import useLocalState from "@/hooks/useLocalState";
import Folder from "@/types/Folder";
import { defaultFolder } from "./defaultFolder";
import { FolderContext } from "./FolderContext";
import readDocList from "@/scripts/readDocList";
import Doc from "@/types/Doc";
import validateFolder from "@/schema/validateFolder";
import readFolderList from "@/scripts/readFolderList";

export default function FolderContainer() {
  const { params } = useRouter<{ dir: string[] }>();
  const {
    userInfo: { workspace },
  } = useApp();

  const path = params.dir.join("/");
  const currentDir = `${workspace}/${path}`;
  const [folder, setFolder] = useLocalState<Folder>("folder", defaultFolder);

  const [folderList, setFolderList] = useLocalState<Folder[]>(path, []);

  const [docList, setDocList] = useLocalState<Doc[]>(path, []);

  useEffect(() => {
    readDocList(currentDir).then((list) => {
      setDocList(list);
    });
  }, [currentDir, setDocList]);
  useEffect(() => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${currentDir}/.config`,
      })
      .then((data) => {
        if (validateFolder(data as Folder)) setFolder(data as Folder);
      });
  }, [currentDir, setFolder, workspace]);

  useEffect(() => {
    readFolderList(currentDir).then((list) => {
      setFolderList(list);
    });
  }, [currentDir, setFolderList]);

  const reload = () => {
    window.api
      .sendMessage({
        type: "read-file",
        path: `${currentDir}/.config`,
      })
      .then((data) => {
        if (validateFolder(data as Folder)) setFolder(data as Folder);
      });
    readFolderList(currentDir).then((list) => {
      setFolderList(list);
    });
    readDocList(currentDir).then((list) => {
      setDocList(list);
    });
  };
  return (
    <FolderContext.Provider
      value={{ folder, currentDir, folderList, reload, docList }}
    >
      <Box>
        <FolderView />
      </Box>
    </FolderContext.Provider>
  );
}
