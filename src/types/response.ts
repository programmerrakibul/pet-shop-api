export interface TResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T | T[];
}
