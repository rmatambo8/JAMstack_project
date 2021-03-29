const faunadb = require("faunadb");
const query = faunadb.query;


exports.handler = async function(inEvent, inContext, inCallback) {
  const incomingData = JSON.parse(inEvent.body);
  const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
  const whichMethod = incomingData.isUpdate ? "Update" : "Create";

  await client.query(
    query[whichMethod](
      query.Ref(query.Collection("markers"), incomingData.key),
      { data : incomingData.marker }
    )
  )
  .then((inSavedDoc) => {
    inCallback(null,
      { statusCode: 200, body: JSON.stringify(inSavedDoc) }
    );
  })
  .catch(inError => {
    return {
      statusCode: 400,
      body: JSON.stringify(inError)
    };
  });

};