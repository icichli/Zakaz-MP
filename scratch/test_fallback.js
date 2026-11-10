async function testFallbackSync() {
  const SPREADSHEET_ID = '1nqOd_F-H60hE8lwObZyBhLhAHFBidV0UKkqLVvl81Ro';
  const SHEET_GIDS = [
    { name: 'Гренки Весовые', gid: '0' },
    { name: 'Сырные Сухие', gid: '716206792' },
    { name: 'Гренки Чипсы и снеки ЗАВОДСКИЕ', gid: '302677348' },
    { name: 'Орехи', gid: '1918744596' },
    { name: 'Начос и лавашики', gid: '555310337' },
    { name: 'Соусы', gid: '753689220' },
    { name: 'Рыбные', gid: '686812298' },
    { name: 'Сыры', gid: '2087869613' },
    { name: 'Мясные', gid: '1279909913' },
    { name: 'Мясные ЗАВОД', gid: '152219417' }
  ];

  console.log('Fetching all 10 sheets in parallel...');
  const promises = SHEET_GIDS.map(async s => {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&gid=${s.gid}`;
    const res = await fetch(url);
    const text = await res.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    return { name: s.name, count: lines.length };
  });

  const results = await Promise.all(promises);
  let total = 0;
  for (const r of results) {
    console.log(`Sheet '${r.name}': ${r.count} rows`);
    total += r.count;
  }
  console.log('TOTAL ROWS FETCHED VIA GVIZ:', total);
}

testFallbackSync();

