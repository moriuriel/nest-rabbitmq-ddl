import { instanceToPlain } from 'class-transformer';
import { Log, LogHeader, StructuredData } from './Log';

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
    const log = new Log(
      this.content.MSG,
      this.content.VERSION,
      this.content.PROCESSNAME,
      this.processLog,
      this.content.TOTALPROCESSINGTIME,
      new LogHeader(
        this.content.HEADER.APPNAME,
        this.content.HEADER.HOSTNAME,
        this.content.HEADER.TIMESTAMP,
      ),
      new StructuredData('stating'),
    );

    const logPlain = instanceToPlain(log);

    const content = {};

    Object.assign(content, { content: logPlain });

    console.log(JSON.stringify(content));

    this.clearInfo();
  }
}
