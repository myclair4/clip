export const onRequest = async ({ request }) => {
  const country = request.headers.get("cf-ipcountry") || "XX";

  let destination;

  switch (country.toUpperCase()) {
    case "ID":
      destination = "/coba"; // Pengunjung dari Indonesia
      break;
    case "US":
      destination = "/coba2"; // Pengunjung dari Amerika
      break;
    case "XX":
      destination = "/nyoba"; // Jika negara tidak terdeteksi
      break;
    default:
      destination = "/index"; // Untuk negara lain
  }

  return Response.redirect(destination, 302);
};
