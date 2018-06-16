import { mock, api } from '../src';
import config from './config.json';
import demo from './scratch/event';

export default mock(api(demo), config);
