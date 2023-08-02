import { paths } from './constants.js';

class PathHandler {
  constructor(subdomain) {
    this.subdomain = subdomain;
  }

  getPath(path) {
    return paths[this.subdomain][path];
  }
}

export default PathHandler;