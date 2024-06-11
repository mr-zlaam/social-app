class ApiResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: any;
  constructor(statusCode: number, data: any, message: any = "OK") {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
export { ApiResponse as apiResponse };
