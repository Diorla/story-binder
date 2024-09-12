export default interface Filter {
  images: {
    name: string;
    extensions: string[];
  };
  pdf: {
    name: string;
    extensions: string[];
  };
  all: {
    name: string;
    extensions: string[];
  };
  db: {
    name: string;
    extensions: string[];
  };
  app: {
    name: string;
    extensions: string[];
  };
}

export type FilterType = keyof Filter;
