import https from 'https';

https.get('https://vrh-celle.de', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const colors = data.match(/#[0-9a-fA-F]{3,6}/g);
    console.log('Colors from vrh-celle.de:', [...new Set(colors)]);
  });
});

https.get('https://api.github.com/users/dysnei-feder/repos', {
  headers: { 'User-Agent': 'Node.js' }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const repos = JSON.parse(data);
      console.log('Repos:', repos.map(r => ({ name: r.name, description: r.description })));
    } catch(e) {
      console.error(e);
    }
  });
});

https.get('https://api.github.com/users/dysnei-feder', {
  headers: { 'User-Agent': 'Node.js' }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const user = JSON.parse(data);
      console.log('User:', { name: user.name, bio: user.bio, avatar_url: user.avatar_url });
    } catch(e) {
      console.error(e);
    }
  });
});
