function dailyNotification() {
  const ss = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/<redacted>/edit"
  );
  const sheet = ss.getSheetByName("Form Responses 1");
  const data = sheet.getDataRange().getValues();
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b"
  ];

  for (let i = 1; i < data.length; i++) {
    const value = data[i][3];      // D
    const notified = data[i][6];   // E
    const image = images[Math.floor(Math.random() * images.length)];

    if (value !== "" && notified !== "YES") {
      const message = String(data[i][3]).replace(/\r?\n/g, "<br>");
      MailApp.sendEmail({
  to: data[i][2],
  subject: `Dari Untuk Dengan Ucapan - ${Utilities.formatDate(
    new Date(data[i][0]),
    Session.getScriptTimeZone(),
    "yyyy-MM-dd"
  )}`,
  htmlBody: `
<!DOCTYPE html>
<html>
<body style="
  margin:0;
  padding:40px;
  font-family:Arial,sans-serif;
  background:url('${image}') center/cover no-repeat;
">
  <div style="
    max-width:600px;
    margin:auto;
    background:rgba(255,255,255,0.92);
    padding:30px;
    border-radius:12px;
  ">
    <h2 style="margin-top:0;">💌 You've received a message</h2>

    <p><strong>Dari:</strong> ${data[i][1]}</p>

    <hr>

    <p style="font-size:18px;line-height:1.6;">
      ${message}
    </p>
  </div>
</body>
</html>`
});
      sheet.getRange(i + 1, 7).setValue("YES");
    }
  }
}