import logError from "@/scripts/logError";
import useLocalState from "@/hooks/useLocalState";

export default function ImagePicker({
  value,
  onUpdate,
  style,
  alt,
}: {
  value: string;
  onUpdate: (value: string) => void;
  style?: React.CSSProperties;
  alt?: string;
}) {
  const [loading, setLoading] = useLocalState("image-picker-loading", false);

  const getImage = () => {
    setLoading(true);
    window.dialog
      .selectFile("images")
      .then((value) => {
        onUpdate(value);
        setLoading(false);
      })
      .catch((err: Error) => {
        setLoading(false);
        logError(err);
      });
  };

  return (
    <img
      src={value}
      style={{
        ...style,
        cursor: loading ? "not-allowed" : "pointer",
        backgroundColor: loading ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0)",
      }}
      alt={alt}
      onClick={() => {
        if (loading) return;
        setLoading(true);
        getImage();
      }}
    />
  );
}
