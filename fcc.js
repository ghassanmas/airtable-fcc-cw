const request = require("request");

const LINK =
  "https://www.freecodecamp.org/api/users/get-public-profile?username=";

module.exports = (usernamelink, cb) => {
  const username = usernamelink.split("/").slice(-1)[0];

  request(LINK + username, function(error, response, body) {
    if (error || body === "{}") {
      return;
    }
    result = JSON.parse(body);
    cb(result.entities.user[username].points);
  });
};
