import QRCode from "react-qr-code";

export default function QRPage() {
  const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const baseURL = window.location.origin + "/menu";

  return (
    <div className="qr-page">
      <h1>Odisha Dhaba</h1>
      <p>Table QR Codes</p>

      <div className="qr-grid">
        {tables.map((table) => {
          const url = `${baseURL}?table=${table}`;

          return (
            <div key={table} className="qr-card">
              <h1>Odisha Dhaba</h1>

              <h3>Table {table}</h3>

              <QRCode value={url} size={190} />
              <p className="qr-url">SCAN view MENU</p>

              {/* <p className="qr-url">{url}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
