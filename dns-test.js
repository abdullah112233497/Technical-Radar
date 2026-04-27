const dns = require('dns').promises;

async function checkDns() {
  const host = 'cluster0.h9rrvaw.mongodb.net';
  const srvHost = '_mongodb._tcp.cluster0.h9rrvaw.mongodb.net';
  
  console.log(`Checking DNS for ${host}...`);
  try {
    const addresses = await dns.resolve4(host);
    console.log('IPv4 addresses:', addresses);
  } catch (e) {
    console.warn('IPv4 lookup failed:', e.message);
  }

  console.log(`Checking SRV for ${srvHost}...`);
  try {
    const srv = await dns.resolveSrv(srvHost);
    console.log('SRV records:', srv);
  } catch (e) {
    console.warn('SRV lookup failed:', e.message);
  }
  
  console.log('Trying with 8.8.8.8...');
  try {
    const resolver = new dns.Resolver();
    resolver.setServers(['8.8.8.8']);
    const srv8 = await resolver.resolveSrv(srvHost);
    console.log('SRV (8.8.8.8):', srv8);
  } catch (e) {
    console.warn('SRV (8.8.8.8) failed:', e.message);
  }
}

checkDns();
