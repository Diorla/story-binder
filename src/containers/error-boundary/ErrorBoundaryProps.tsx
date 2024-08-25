export default interface ErrorBoundaryProps {
  children: React.ReactNode;
  setError: (error: Error) => void;
}
