const filterList = ["images", "pdf", "all", "db", "app"] as const;

export type FilterType = (typeof filterList)[number];

type Filter = {
  [key in FilterType]: {
    name: string;
    extensions: string[];
  };
};

export default Filter;
