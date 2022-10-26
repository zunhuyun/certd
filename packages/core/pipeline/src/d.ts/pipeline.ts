export enum RunStrategy {
  AlwaysRun,
  SkipWhenSucceed,
}

export enum ConcurrencyStrategy {
  Serial,
  Parallel,
}

export enum NextStrategy {
  AllSuccess,
  OneSuccess,
}

export enum HandlerType {
  //清空后续任务的状态
  ClearFollowStatus,
  SendEmail,
}

export type EventHandler = {
  type: HandlerType;
  params: {
    [key: string]: any;
  };
};

export type RunnableStrategy = {
  runStrategy: RunStrategy;
  onSuccess: EventHandler[];
  onError: EventHandler[];
};

export type Step = Runnable & {
  type: string; //插件类型
  input: {
    [key: string]: any;
  };
};
export type Task = Runnable & {
  steps: Step[];
};

export type Stage = Runnable & {
  tasks: Task[];
  concurrency: ConcurrencyStrategy;
  next: NextStrategy;
};

export type Trigger = {
  id: string;
  title: string;
  cron: string;
};

export type Runnable = {
  id: string;
  title: string;
  status?: string;
  lastTime?: number;
  strategy?: RunnableStrategy;
};

export type Pipeline = Runnable & {
  version: number;
  stages: Stage[];
  triggers: Trigger[];
};

export type Context = {
  [key: string]: any;
};

export type Log = {
  title: string;
  time: number;
  level: string;
  text: string;
};

export type HistoryResult = {
  title: string;
  /**
   * 任务状态
   */
  status: string;
  startTime: number;
  endTime?: number;
  /**
   * 处理结果
   */
  result?: string;
  errorMessage?: string;
};