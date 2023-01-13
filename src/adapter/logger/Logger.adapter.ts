interface ILoggerContent {
  MSG: string;
  HEADER: {
    APPNAME: string;
    HOSTNAME: string;
    TIMESTAMP: string;
  };
  VERSION: string;
  PROCESSNAME: string;
  PROCESSLOG: Array<string>;
  TOTALPROCESSINGTIME: number;
}

export class LoggerAdapter {
  private content: ILoggerContent = {} as ILoggerContent;
  private processLog: Array<string> = [];

  constructor() {
    this.clearInfo();
  }

  private clearInfo() {
    this.content = {} as ILoggerContent;
    this.processLog = [];
  }

  setMessage(message: string) {
    this.content.MSG = message;
  }

  setHeader(app: string, host: string) {
    this.content.HEADER = {
      APPNAME: app,
      HOSTNAME: host,
      TIMESTAMP: new Date(Date.now()).toISOString(),
    };
  }

  setVersion(version: string) {
    this.content.VERSION = version;
  }

  setProcessName(process: string) {
    this.content.PROCESSNAME = process;
  }

  setProcessLog(processLog: string) {
    this.processLog.push(processLog);
  }

  setProcessTime(time: number) {
    this.content.TOTALPROCESSINGTIME = time;
  }

  sendLog() {
    const content = {};

    Object.assign(content, { ...this.content, PROCESSLOG: this.processLog });

    const logObject = { content };

    console.log(JSON.stringify(logObject));
    this.clearInfo();
  }
}
