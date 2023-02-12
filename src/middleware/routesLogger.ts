import fs from 'fs';
import { Router } from 'express';
import morgan from 'morgan';
import { METHOD, TEXT, FORMAT } from '../utils';

// create root logs dir if none exists
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const router = Router();

morgan.format('request', (tokens, req, res) => {
  let METHOD_COLOR: string;
  switch (req.method) {
    case METHOD.GET:
      METHOD_COLOR = TEXT.BLUE;
      break;
    case METHOD.POST:
      METHOD_COLOR = TEXT.LIGHT_GREEN;
      break;
    case METHOD.PUT:
    case METHOD.PATCH:
      METHOD_COLOR = TEXT.ORANGE;
      break;
    case METHOD.DELETE:
      METHOD_COLOR = TEXT.RED;
      break;
    case METHOD.OPTIONS:
    case METHOD.HEAD:
      METHOD_COLOR = TEXT.CYAN;
      break;
    default:
      METHOD_COLOR = FORMAT.RESET;
      break;
  }

  const output = [
    FORMAT.RESET,
    '\n',
    '[request] ',
    FORMAT.BOLD,
    METHOD_COLOR,
    ':method ',
    FORMAT.RESET,
    ':url',
  ];
  const fn = morgan.compile(output.join(''));
  return fn(tokens, req, res);
});

morgan.format('response', (tokens, req, res) => {
  const status = res.statusCode;
  const STATUS_COLOR =
    status >= 500
      ? TEXT.RED
      : status >= 400
      ? TEXT.YELLOW
      : status >= 300
      ? TEXT.CYAN
      : status >= 200
      ? TEXT.GREEN
      : FORMAT.RESET;

  const output = [
    FORMAT.RESET,
    '[response] ',
    FORMAT.BOLD,
    STATUS_COLOR,
    ':status ',
    FORMAT.RESET,
    ':response-time ms ',
    '- ',
    ':res[content-length]',
  ];
  const fn = morgan.compile(output.join(''));
  return fn(tokens, req, res);
});

router.use(
  morgan('request', { immediate: true }),
  morgan('response'),
  morgan('combined', {
    stream: fs.createWriteStream(
      'logs/access.log',
      // { flags: 'a' }, // append to not overwrite
    ),
  }),
);

export { router as routesLogger };
