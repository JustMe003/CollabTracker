export enum AuthErrorType {
  authorization_pending,
  slow_down,
  expired_token,
  access_denied,
  unsupported_grant_type,
  incorrect_client_credentials,
  incorrect_device_code,
  device_flow_disabled
}

export function errorToEnum(error: string) {
  return new Map<string, AuthErrorType>([
    ["authorization_pending", AuthErrorType.authorization_pending],
    ["slow_down", AuthErrorType.slow_down],
    ["expired_token", AuthErrorType.expired_token],
    ["access_denied", AuthErrorType.access_denied],
    ["unsupported_grant_type", AuthErrorType.unsupported_grant_type],
    ["incorrect_client_credentials", AuthErrorType.incorrect_client_credentials],
    ["incorrect_device_code", AuthErrorType.incorrect_device_code],
    ["device_flow_disabled", AuthErrorType.device_flow_disabled],
  ]).get(error);
}