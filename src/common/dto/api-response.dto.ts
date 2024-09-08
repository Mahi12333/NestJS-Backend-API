// src/common/dto/api-response.dto.ts

export class ApiResponse<T = any> {
    constructor(
      public statusCode: number,  // HTTP Status Code (e.g., 200, 400, 500, etc.)
      public message: string,     // Message describing the result (success/error)
      public status: 'success' | 'error',  // Status string ("success" or "error")
      public data?: T             // Optional data to include in the response (generic type T)
    ) {}
  }
  