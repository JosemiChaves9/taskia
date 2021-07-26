require('dotenv').config();
export class EnviromentVariables {
  static getUriForHttpServer() {
    if (process.env.REACT_APP_ENVIROMENT === 'dev') {
      return `http://localhost:${this.getPort()}`;
    } else {
      return `http://${
        process.env.REACT_APP_SERVER_URI
      }:${EnviromentVariables.getPort()}`;
    }
  }
  static getUriForWsServer() {
    if (process.env.REACT_APP_ENVIROMENT === 'dev') {
      return `ws://localhost:${EnviromentVariables.getPort()}/${
        process.env.REACT_APP_WS_SERVER_PATH
      }`;
    } else {
      return `ws://${
        process.env.REACT_APP_SERVER_URI
      }:${EnviromentVariables.getPort()}/${
        process.env.REACT_APP_WS_SERVER_PATH
      }`;
    }
  }
  static getPort() {
    return process.env.REACT_APP_SERVER_PORT || 4000;
  }
}
