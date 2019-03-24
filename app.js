const express = require("express");
const fccHelper = require("./fcc");
const cwHelper = require("./codewars");

const API_KEY = "";
const BASE_ID = "";

const app = express();

app.use(express.json());

var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: API_KEY
});
var base = Airtable.base(BASE_ID);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("getting the Applicants info...");

  base("Applicants")
    .select({
      // Selecting the first 3 records in Grid view:
      view: "Grid view"
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          console.log(record.id);
          console.log("Retrieved", record.get("Email address"));
          res.write("<br> getting " + record.get("Name") + " info");
          fccHelper(record.get("FCC Username"), fccScore => {
            base("Applicants").update(record.id, {
              "FCC Score": fccScore
            });
          });

          cwHelper(record.get("CodeWars Username"), cwScore => {
            base("Applicants").update(record.id, {
              "Code Wars Level": cwScore
            });
          });
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        res.end("<br> finished");
      }
    );
});

app.listen(3000, () => {
  console.log("app is now listening port 3000");
});
