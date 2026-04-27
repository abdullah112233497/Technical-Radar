const dns = require('dns').promises;

async function checkDns() {
  const host = 'cluster0.h9rrvaw.mongodb.net';
  
  console.log(`Checking TXT for ${host}...`);
  try {
    const resolver = new dns.Resolver();
    resolver.setServers(['8.8.8.8']);
    const txt = await resolver.resolveTxt(host);
    console.log('TXT records:', txt);
  } catch (e) {
    console.warn('TXT lookup failed:', e.message);
  }
}

checkDns();
