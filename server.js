import express from 'express';

// asangels.shahrx.com is retired. This service now does one thing:
// permanently redirect all traffic to Vigilance Capital Partners.
// No Anthropic / news / web-search calls — this keeps the service at $0 spend.

const app = express();
const PORT = process.env.PORT || 8080;
const TARGET = 'https://vigilancecapitalpartners.com';

// Health check for Railway.
app.get('/healthz', (_req, res) => res.status(200).send('ok'));

// Redirect everything else to VCP.
app.use((_req, res) => {
  res.redirect(301, TARGET);
});

app.listen(PORT, () => {
  console.log(`asangels-portal redirect → ${TARGET} (port ${PORT})`);
});
