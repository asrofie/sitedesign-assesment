export interface LogData {
  category?: string;
  module?: string;
  path?: string;
  query?: any;
  body?: any;
  response?: any;
  response_time?: number;
  method?: string;
  timestamp: string;
}
