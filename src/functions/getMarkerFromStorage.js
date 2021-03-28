const faunadb = require("faunadb"); const query = faunadb.query;
exports.handler = async function (inEvent, inContext, inCallback) {
  const key = inEvent.queryStringParameters.key;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  });

  await client.query(
    query.Get(query.Ref(query.Collection("markers"), key))
  ).then((inDoc) => {
    inCallback(null, { statusCode: 200, body: JSON.stringify(inDoc) });
  })
    .catch(inError => {
      return {
        statusCode: 400,
        body: JSON.stringify(inError)
      };
    });
};