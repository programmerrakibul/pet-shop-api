export interface TResponse<T> {
  success: boolean;
  message: string;
  data?: T | T[];
}
