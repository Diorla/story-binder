import { Component } from "react";
import ErrorBoundaryProps from "./ErrorBoundaryProps";
import logError from "@/scripts/logError";
import ErrorComponent from "./ErrorComponent";

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  state: { error: null | Error } = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    logError(error);
    return { error };
  }

  componentDidCatch(error: Error) {
    logError(error);
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return <ErrorComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}
