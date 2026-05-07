const fs = require('node:fs');

const NOCODB_DOMAIN = process.env.NOCODB_DOMAIN;
const NOCODB_TOKEN = process.env.NOCODB_TOKEN;
const NOCODB_BASE = process.env.NOCODB_BASE;

const NOCODB_URL = `${NOCODB_DOMAIN}/api/v3/data/${NOCODB_BASE}`;

const endpoints = {
  bundle: {
    path: './src/data/bundles.json',
    url: `${NOCODB_URL}/m6gi23nlsnjm3nf/records?pageSize=9999`,
  },
  bundlePack: {
    path: './src/data/bundles-packs.json',
    url: `${NOCODB_URL}/me1afh8s9gq0fg2/records?pageSize=9999`,
  },
  bundlePackItem: {
    path: './src/data/bundles-packs-items.json',
    url: `${NOCODB_URL}/m3r6fzvwk21pw2c/records?pageSize=9999`,
  },
  bundleReward: {
    path: './src/data/bundles-rewards.json',
    url: `${NOCODB_URL}/mt9lh321o709rue/records?pageSize=9999`,
  },
  city: {
    path: './src/data/cities.json',
    url: `${NOCODB_URL}/mhomusv3ag3qva4/records?pageSize=9999`,
  },
  items: {
    path: './src/data/items.json',
    url: `${NOCODB_URL}/mk3bufsibxt55gu/records?pageSize=9999`,
  },
};

Object.keys(endpoints).forEach((endpoint) => {
  const { url, path } = endpoints[endpoint];
  saveOnlineJsonToLocal(url, path);
});

async function saveOnlineJsonToLocal(url, path) {
  if (!url || !path) {
    throw new Error('No Url or Path provided');
  }
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'xc-token': NOCODB_TOKEN,
      },
    });
    const content = await response.json();
    fs.writeFile(path, JSON.stringify(content.records), (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
}
