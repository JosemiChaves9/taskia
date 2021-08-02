require('dotenv').config();
export class EnviromentVariables {
  static getUriForHttpServer() {
    if (process.env.REACT_APP_ENVIROMENT === 'prod') {
      return `https://${process.env.REACT_APP_SERVER_URI}`;
    } else {
      return `http://localhost:${EnviromentVariables.getPort()}`;
    }
  }
  static getUriForWsServer() {
    if (process.env.REACT_APP_ENVIROMENT === 'prod') {
      return `wss://${process.env.REACT_APP_SERVER_URI}/${process.env.REACT_APP_WS_SERVER_PATH}`;
    } else {
      return `ws://localhost:${EnviromentVariables.getPort()}/${
        process.env.REACT_APP_WS_SERVER_PATH
      }`;
    }
  }
  static getPort() {
    return process.env.REACT_APP_SERVER_PORT || 4000;
  }
}
