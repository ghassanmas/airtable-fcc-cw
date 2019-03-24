const request = require("request");
const LINK = "https://www.codewars.com/api/v1/users/";
module.exports = (usernamelink, cb) => {
  const username = usernamelink.split("/").slice(-1)[0];
  request(LINK + username, function(error, response, body) {
    if (error || response.statusCode === 404) {
      return;
    }
    result = JSON.parse(body);
    cb(result.ranks.overall.name);
  });
};
