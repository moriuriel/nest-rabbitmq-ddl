import { Expose } from 'class-transformer';

export class StructuredData {
  enviroment: string;

  constructor(enviroment: string) {
    this.enviroment = enviroment;
  }
}

export class LogHeader {
  @Expose({ name: 'APP-NAME' })
  appName: string;
  @Expose({ name: 'HOSTNAME' })
  hostName: string;
  @Expose({ name: 'TIMESTAMP' })
  timestamp: string;

  constructor(appName: string, hostName: string, timestamp: string) {
    this.appName = appName;
    this.hostName = hostName;
    this.timestamp = timestamp;
  }
}

export class Log {
  @Expose({ name: 'MSG' })
  msg: string;
  @Expose({ name: 'VERSION' })
  version: string;
  @Expose({ name: 'PROCESS-NAME' })
  processName: string;
  @Expose({ name: 'PROCESS-LOG' })
  processLog: Array<string>;
  @Expose({ name: 'TOTAL-PROCESSING-TIME' })
  totalProcessingTime: number;
  @Expose({ name: 'HEADER' })
  header: LogHeader;
  @Expose({ name: 'STRUCTURED-DATA' })
  structuredData: StructuredData;

  constructor(
    msg: string,
    version: string,
    processName: string,
    processLog: Array<string>,
    totalProcessingTime: number,
    header: LogHeader,
    structuredData: StructuredData,
  ) {
    this.header = header;
    this.msg = msg;
    this.version = version;
    this.processLog = processLog;
    this.processName = processName;
    this.totalProcessingTime = totalProcessingTime;
    this.structuredData = structuredData;
  }
}
