/**
 * Success response codes — add specific codes per API.
 * Example: BOOK_CREATED, TRADE_COMPLETED, ...
 */
export enum SuccessCode {
  // Add specific codes here
}

/**
 * Error response codes — add specific codes per API.
 * Example: MISSING_PASSWORD, INVALID_SEMESTER, BOOK_NOT_FOUND, ...
 */
export enum ErrorCode {
  // Google OAuth2.0
  GOOGLE_OAUTH2_NOT_ALLOW_EMAIL_SUFFIX = "GGOA000000",
  GOOGLE_OAUTH2_EMAIL_NOT_FOUND = "GGOA000001",
}

export enum ErrorMessage {
  // Google OAuth2.0
  GOOGLE_OAUTH2_NOT_ALLOW_EMAIL_SUFFIX = "Chỉ cho phép đăng nhập bằng email sinh viên VLUTE (@st.vlute.edu.vn)",
  GOOGLE_OAUTH2_EMAIL_NOT_FOUND = "Không tìm thấy email từ tài khoản Google",
}
