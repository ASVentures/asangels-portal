import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

const REDIRECT_TARGET_HOST = 'deals.vigilancecapitalpartners.com';
const REDIRECT_TARGET = `https://${REDIRECT_TARGET_HOST}`;

// 301 every request to the new home on deals.vigilancecapitalpartners.com.
// Path and query are preserved so deep links (if any) still land somewhere
// sensible. If this service is accidentally also routed for deals.* (custom
// domain pointed here in Railway), respond with a 200 notice instead of
// redirecting to ourselves and creating a loop.
app.get(/.*/, (req, res) => {
  const host = (req.hostname || '').toLowerCase();
  if (host === REDIRECT_TARGET_HOST || host.startsWith('deals.')) {
    res.status(200).type('text/plain').send(
      'This Railway service is the legacy asangels.shahrx.com redirect target.\n' +
      'The host "' + host + '" is misrouted to it. Update the Railway custom-domain\n' +
      'config so deals.vigilancecapitalpartners.com points at the unified\n' +
      'vigilance-capital-landing service instead.'
    );
    return;
  }
  const search = req.originalUrl.includes('?') ? '?' + req.originalUrl.split('?').slice(1).join('?') : '';
  const path = req.path === '/' ? '/' : req.path;
  res.redirect(301, REDIRECT_TARGET + path + search);
});

app.listen(PORT, () => {
  console.log(`asangels.shahrx.com redirect server running on port ${PORT} — all traffic 301 -> ${REDIRECT_TARGET}`);
});
