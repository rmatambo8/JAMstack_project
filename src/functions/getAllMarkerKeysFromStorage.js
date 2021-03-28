const faunadb = require('faunadb');
const query = faunadb.query;

exports.handler = async function (event, context, callback) {
  const documentID = event.queryStringParameters.documentID;
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  });

  const response = await client.query(
    query.Paginate(query.Match(query.Ref("indexes/markers")))
  );

  const docRefs = response.data;
  let keys = docRefs.filter(ref => ref.id.startsWith(documentID));
  keys = keys.map(ref => ref.id);
  callback(null, { statusCode: 200, body: JSON.stringify(keys) });
}