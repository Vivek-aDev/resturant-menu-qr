
import QRCode from "react-qr-code";

export default function QRPage() {
  const url = window.location.origin + "/menu";

  return (
    <div className="qr-page">
      <h1>Odisha Dhaba</h1>
      <p>Scan to view our menu</p>

      <div className="qr-box">
        <QRCode value={url} size={220} />
      </div>

      <p className="small">URL encoded in QR:</p>
      <code>{url}</code>
    </div>
  );
}
