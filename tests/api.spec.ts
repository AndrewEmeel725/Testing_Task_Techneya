import {test,expect} from "@playwright/test"

let objectId ;
let fullPathWithId;
const baseUrl ='https://api.restful-api.dev/'
const objectPath='objects'
const fullUrl= baseUrl + objectPath;
test ('get api', async ({request}) => {

const response = await request.get(fullUrl);
let responseBody= await response.json();
let responseHeader= await response.headers();
console.log(responseBody);
expect (response.status()).toBe(200);
console.log(responseHeader);
expect(responseBody[0].id).toBe('1');
expect(responseHeader['content-type']).toContain('application/json');
let responseSize=(await response.body()).byteLength;
expect (responseSize).toBeLessThan(4000);






});

test ('post api', async ({request}) => {


const payload ={
    id: '7',
    name: 'Andrew Ultra',
    data: {
      year: 2019,
      price: 1849.99,
      'CPU model': 'Intel Core i9',
      'Hard disk size': '1 TB'
    }
  }


  const response= await request.post(fullUrl,{
    data:payload
  });
  let responseBody = await response.json();
  console.log(responseBody);
  expect (response.status()).toBe(200);
  expect (responseBody.name).toContain(payload.name);
  objectId = responseBody.id;
 fullPathWithId= fullUrl+'/'+objectId;
  
});

test ('put api', async ({request}) => {


const payload ={
id	:"7",
name:	"Apple MacBook Pro 199",
data:	{
year:	2019,
price:	1849.99,
model:	"Intel Core i9",

    }
  }


  const response= await request.put(fullPathWithId,{
    data:payload
  });
  let responseBody = await response.json();
  console.log(responseBody);
  expect (response.status()).toBe(200);
  expect (responseBody.name).toContain(payload.name);




});

test ('patch api', async ({request}) => {


const payload ={
name:	"Apple MacBook Pro 190"
    }
  


  const response= await request.patch(fullPathWithId,{
    data:payload
  });
  let responseBody = await response.json();
  console.log(responseBody);
  expect (response.status()).toBe(200);
  expect (responseBody.name).toContain(payload.name);




});

test ('delete api', async ({request}) => {





  const response= await request.delete(fullPathWithId);
  let responseBody = await response.json();
  console.log(responseBody);
  expect (response.status()).toBe(200);
  expect (responseBody.message).toContain('Object with');
  



});
