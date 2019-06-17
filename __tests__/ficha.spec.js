const { MongoClient, ObjectID } = require('mongodb');
const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

const url = 'mongodb://db:27017/test';
const dbName = 'test';

let db = null;
const client = new MongoClient(url);

describe('test demo', () => {
  // eslint-disable-next-line no-underscore-dangle
  let _id = null;

  beforeAll(async () => {
    await client.connect();
    db = client.db(dbName);
  });

  afterAll(() => {
    client.close();
  });

  beforeEach(async () => {
    _id = new ObjectID();
    await db.collection('test').insertOne({
      _id, owner: 'miguel', color: 'red', num: 5,
    });
  });

  afterEach(async () => {
    await db.collection('test').deleteMany({ });
  });

  test('test simple', async () => {
    expect.assertions(1);
    const response = await axios.get('http://api:3000/api/test') //,      
    expect(response.data).toEqual(
      {a: 1}
    );
  });
});
