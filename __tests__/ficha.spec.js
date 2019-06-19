const { MongoClient, ObjectID } = require('mongodb');
const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

const url = 'mongodb://db:27017/test';
const dbName = 'test';

let db = null;
const client = new MongoClient(url);

describe('test demo', () => {
  // eslint-disable-next-line no-underscore-dangle
  let _id = new ObjectID();
  /*
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
  */

  beforeAll(async () => {
    await client.connect();
    db = client.db(dbName);
    //_id = new ObjectID();
    await db.collection('users').insertOne({
      _id, name: 'miguel'
    });
  });

  afterAll(async () => {
    await db.collection('users').deleteMany({ });
    await client.close();
  });

  test('patch form datasheet', async () => {
    expect.assertions(2)
    // eslint-disable-next-line no-underscore-dangle
    //const _id = new ObjectID()
    const response = await axios.patch(
      'http://api:3000/api/auth/user/datasheet/' + _id,
      {
        type: "datasheet",
        father: {
          name: 'diego'
        }
      },{
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidGVzdCIsInBlcm1pc3Npb25zIjpbInVzZXIvZGF0YXNoZWV0OndyaXRlIl0sImlhdCI6MTU2MDg5OTQ2OX0.6GjryHG11aUxfZP7rjSUk4pswfILEC9RcPvOVO-ymWI"
        }
      }
      )      
    expect(response.status).toEqual(204);
    const doc = await db.collection('users').findOne({_id})
    expect(doc).toEqual({_id, name: 'miguel', datasheet: {
      type: "datasheet",
      father: {
        name: 'diego'
      }
    }})
  });
});
