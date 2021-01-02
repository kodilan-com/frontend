const fs = require('fs');
const path = require('path');
const axios = require('axios');

const endpoint = 'https://flash.superpeer.com/hosts/fetchByUsername';
const usernames = [
  'emirkarsiyakali',
  'berilkarabulut',
  'dorian',
  'selcuk',
  'giray',
  'serbay',
  'candost',
  'oktayelipek',
  'ezgierdemaytac',
  'peacecwz',
  'ferdicildiz',
  'yakuter',
  'azmimengu',
  'iammert',
  'f',
  'serhat',
  'suadev',
  // 'kara',
  // 'yigit',
  // 'cavide',
];

(async () => {
  const q = usernames.map(async (username) => {
    const { data } = await axios.post(endpoint, { username });

    return { profile: data.profile, username };
  });

  const hosts = await Promise.all(q);

  fs.writeFileSync(path.join(__dirname, '../src/assets/data/mentors.json'), JSON.stringify(hosts, null, 2), { encoding: 'utf8' });
})();
