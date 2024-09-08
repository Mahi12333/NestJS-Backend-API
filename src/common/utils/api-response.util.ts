// src/common/utils/api-response.util.ts

import { ApiResponse } from '../dto/api-response.dto'; // Import ApiResponse DTO

export class ApiResponseUtil {
  
  // Success Response Method
  static success(message: string, data?: any): ApiResponse {
    return new ApiResponse(200, message, 'success', data);
  }

  // Error Response Method
  static error(message: string, statusCode = 400): ApiResponse {
    return new ApiResponse(statusCode, message, 'error');
  }
}
