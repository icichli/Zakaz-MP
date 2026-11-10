async function test() {
  const url = 'https://docs.google.com/spreadsheets/d/1nqOd_F-H60hE8lwObZyBhLhAHFBidV0UKkqLVvl81Ro/export?format=xlsx';
  try {
    console.log('Fetching', url);
    const res = await fetch(url);
    console.log('Status:', res.status, res.statusText);
    const buf = await res.arrayBuffer();
    console.log('Byte length:', buf.byteLength);
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
test();

