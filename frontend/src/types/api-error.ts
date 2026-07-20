export interface ApiError {
  statusCode: number;
  message: string;
  errors?: unknown[];
}