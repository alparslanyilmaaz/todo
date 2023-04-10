function response(data?: unknown, message?: string, code?: number) {
  return {
    body: data ? data : { message },
    code: code || 204
  }
}
export const ServerResponse = {
  success: (data: unknown) => response(data, undefined, 200),
  no_content: () => response(null, undefined, 204),
  error: {
    internal_server_error: (data: unknown, message: string) => response(data, message, 500),
    invalid_request: (data: unknown, message: string) => response( data, message, 400),
    unprocessible_entry: (data: unknown, message: string) => response( data, message, 422),
    authorization_required: (data: unknown, message: string) => response( data, message, 401),
    not_found: (data: unknown, message: string) => response(data, message, 404),
  }
}