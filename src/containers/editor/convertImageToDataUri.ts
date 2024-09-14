export default function convertImageToDataUri(
  file: Blob,
  callback: (value: string | ArrayBuffer) => void
) {
  const reader = new FileReader();
  reader.onload = function (e) {
    if (e?.target?.result) callback(e.target.result);
  };
  reader.readAsDataURL(file);
}
