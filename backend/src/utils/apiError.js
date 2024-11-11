class ApiError extends Error {
    constructor(
      statusCode,
      message = "Something went wrong",
      errors = [],
      stack = ""
    ) {
      super(message);
      this.statusCode = statusCode;
      this.success = false;
      this.errors = errors;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  
    toJSON() {
      return {
          success: this.success,
          message: this.message,
          statusCode: this.statusCode,
          errors: this.errors,
      };
  }
    
  }
  
  
  
  export { ApiError };
  