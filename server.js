import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

const REDIRECT_TARGET = 'https://deals.vigilancecapitalpartners.com';

// 301 every request to the new home on deals.vigilancecapitalpartners.com.
// Path and query are preserved so deep links (if any) still land somewhere sensible.
app.get(/.*/, (req, res) => {
  const search = req.originalUrl.includes('?') ? '?' + req.originalUrl.split('?').slice(1).join('?') : '';
  const path = req.path === '/' ? '/' : req.path;
  res.redirect(301, REDIRECT_TARGET + path + search);
});

app.listen(PORT, () => {
  console.log(`asangels.shahrx.com redirect server running on port ${PORT} — all traffic 301 -> ${REDIRECT_TARGET}`);
});
