import { Component } from "react";
import ErrorBoundaryProps from "./ErrorBoundaryProps";
import logError from "@/scripts/logError";

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  state: { error: null | Error } = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    this.props.setError(error);
    logError(error);
    this.setState({ error });
  }

  render() {
    return this.props.children;
  }
}
