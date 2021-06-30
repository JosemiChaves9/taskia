require('dotenv').config();

export class EnviromentVariables {
  static getUriForHttpServer() {
    return (
      `http://${process.env.REACT_APP_HTTP_SERVER_HOST}:${this.getPort()}` ||
      'http://localhost:4000'
    );
  }
  static getUriForWsServer() {
    return (
      `ws://${process.env.REACT_APP_WS_SERVER_HOST}:${this.getPort()}/${
        process.env.REACT_APP_WS_SERVER_PATH
      }` || 'ws://localhost:4000/projects'
    );
  }
  static getPort() {
    return process.env.REACT_APP_PORT || 4000;
  }
}
