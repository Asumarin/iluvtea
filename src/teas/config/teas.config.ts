import { registerAs } from '@nestjs/config';

export default registerAs('teas', () => ({
  foo: 'bar',
}));
