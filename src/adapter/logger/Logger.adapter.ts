import { instanceToPlain } from 'class-transformer';
import { Log, LogHeader, StructuredData } from './Log';

interface IHeader {
  appName: string;
  hostName: string;
  timestamp: string;
}

export class LoggerAdapter {
  private processLog: Array<string> = [];
  private version: string;
  private message: string;
  private processName: string;
  private totalProcessingTime: number;
  private header: IHeader;

  constructor() {
    this.header = {
      appName: 'BURGER-WORKER',
      hostName: 'localhost',
      timestamp: new Date(Date.now()).toISOString(),
    };
  }

  setMessage(message: string) {
    this.message = message;
  }

  setVersion(version: string) {
    this.version = version;
  }

  setProcessName(process: string) {
    this.processName = process;
  }

  setProcessLog(processLog: string) {
    this.processLog.push(processLog);
  }

  setProcessTime(time: number) {
    this.totalProcessingTime = time;
  }

  sendLog() {
    const log = new Log(
      this.message,
      this.version,
      this.processName,
      this.processLog,
      this.totalProcessingTime,
      new LogHeader(
        this.header.appName,
        this.header.hostName,
        this.header.timestamp,
      ),
      new StructuredData('stating'),
    );

    const logPlain = instanceToPlain(log);

    const content = {};

    Object.assign(content, { content: logPlain });

    console.log(JSON.stringify(content));
  }
}
