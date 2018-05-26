import { mock, api } from '../src';
import config from './config.json';
import demo from './scratch/grouped';

export default mock(api(demo), config);
