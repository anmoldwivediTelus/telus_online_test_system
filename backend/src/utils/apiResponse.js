class ApiResponse {
    constructor(statusCode, status, message = "success", data) {
      this.statusCode = statusCode;
      this.status = status;
      this.message = message;
      this.data = data;
    }
  }
  
  export { ApiResponse };

  