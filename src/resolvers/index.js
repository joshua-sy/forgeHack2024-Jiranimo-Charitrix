import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);

  return 'Hello, world!';
});

resolver.define('getEvents', async () => {
  const response = await fetch("https://api.humanitix.com/v1/events?page=1", {
    method:"GET",
    headers: {
        'Accept': 'application/json',
        "X-API-KEY": process.env.HUMANITIX_KEY
    }
  })
  const data = await response.json();
  console.log(data);
  return data
})

resolver.define('getOrders', async () => {
  const response = await fetch(`https://api.humanitix.com/v1/events/6684201aa11fb751bbb96424/orders?page=1`, {
    method:"GET",
    headers: {
        'Accept': 'application/json',
        "X-API-KEY": process.env.HUMANITIX_KEY
    }
  })
  const data = await response.json()
  // console.log('getOrders' , data)
  return data
});

resolver.define('getSpecificEvent', async (eventID) => {
  const response = await fetch("https://api.humanitix.com/v1/events/6684201aa11fb751bbb96424", {
    method:"GET",
    headers: {
        'Accept': 'application/json',
        "X-API-KEY": process.env.HUMANITIX_KEY
    }
  })
  const data = await response.json();
  // console.log('getSpecificEvent', data);

  return data
})


export const handler = resolver.getDefinitions();