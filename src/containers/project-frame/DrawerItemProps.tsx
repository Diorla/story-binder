export default interface DrawerItemProps {
  text: string;
  onClick: () => void;
  active: boolean;
  isFile?: boolean;
}
