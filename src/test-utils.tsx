import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import THEME from "./constants/THEME";
import * as matchers from "jest-extended";
expect.extend(matchers);
// import { ThemeProvider } from "my-ui-lib";
// import { TranslationProvider } from "my-i18n-lib";
// import defaultStrings from "i18n/en-x-default";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ThemeProvider theme="light">
    //   <TranslationProvider messages={defaultStrings}>
    <ThemeProvider theme={THEME}>{children}</ThemeProvider>
    //   </TranslationProvider>
    // </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line import/export
export * from "@testing-library/react";
// eslint-disable-next-line import/export
export { customRender as render };
