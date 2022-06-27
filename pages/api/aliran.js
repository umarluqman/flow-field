import { GoogleSpreadsheet } from "google-spreadsheet";
import { fromJSON } from "flatted";

export default async function userHandler(req, res) {
  try {
    const { body, method } = req;

    const creds = require("../../aliran-07baf8a3ed61.json"); // the file saved above
    const doc = new GoogleSpreadsheet(
      "1I19dvUc03NwqWtXX2xCNdnaT1ggGbhbr_TLcxE4wxwU"
    );
    await doc.useServiceAccountAuth(creds);

    // or preferably, loading that info from env vars / config instead of the file
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    // example using impersonation - NOTE: your service account must have "domain-wide delegation" enabled
    // see https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
    await doc.useServiceAccountAuth(creds, "user.to.impersonate@mycompany.com");

    console.log({ body, parsed: fromJSON(body) });
    // const parsed = parse(body);

    // console.log("server", { points, r1, r2, g1, g2, b1, b2 });

    switch (method) {
      case "POST":
        const doc = new GoogleSpreadsheet(
          "1I19dvUc03NwqWtXX2xCNdnaT1ggGbhbr_TLcxE4wxwU"
        );

        doc.useApiKey(process.env.GOOGLE_API_KEY);

        const sheet = await doc.addSheet({
          headerValues: [
            "points",
            "red 1",
            "red 2",
            "green 1",
            "green 2",
            "blue 1",
            "blue 2",
          ],
        });

        res.status(200).json({ sheet });
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log({ error });
  }
}
