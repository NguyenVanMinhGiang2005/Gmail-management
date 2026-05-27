from typing import Any

import jwt
from fastapi import Request, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.config import config


class AuthMiddleware(BaseHTTPMiddleware):
    """
    Middleware kiểm tra JWT cho các route cần đăng nhập.

    Cách hoạt động:
    - Bỏ qua các public path như docs, openapi, login.
    - Cho phép request OPTIONS để CORS preflight không bị chặn.
    - Đọc token từ header: Authorization: Bearer <token>.
    - Decode token bằng SECRET_KEY_ADMIN hoặc SECRET_KEY_USER.
    - Lưu thông tin user/admin vào request.state.auth để route phía sau dùng.
    """

    PUBLIC_PATHS = {
        "/",
        "/docs",
        "/redoc",
        "/openapi.json",
        "/api/admin/auth/login",
        "/api/v1/auth/login",
        "/api/v1/auth/register",
    }

    def __init__(self, app, protected_prefixes: tuple[str, ...] = ("/api/admin",)):
        super().__init__(app)
        self.protected_prefixes = protected_prefixes

    async def dispatch(self, request: Request, call_next):
        path = request.url.path

        if request.method == "OPTIONS":
            return await call_next(request)

        if self._is_public_path(path) or not self._is_protected_path(path):
            return await call_next(request)

        authorization = request.headers.get("Authorization")

        if not authorization:
            return self._error_response(
                status_code=status.HTTP_401_UNAUTHORIZED,
                message="Missing Authorization header",
            )

        scheme, token = self._split_authorization_header(authorization)

        if scheme.lower() != "bearer" or not token:
            return self._error_response(
                status_code=status.HTTP_401_UNAUTHORIZED,
                message="Invalid Authorization header. Use: Bearer <token>",
            )

        payload = self._decode_token(token)

        if payload is None:
            return self._error_response(
                status_code=status.HTTP_401_UNAUTHORIZED,
                message="Invalid or expired token",
            )

        if path.startswith("/api/admin") and payload.get("role") != "admin":
            return self._error_response(
                status_code=status.HTTP_403_FORBIDDEN,
                message="Admin permission required",
            )

        request.state.auth = {
            "user_id": payload.get("user_id"),
            "email": payload.get("email"),
            "role": payload.get("role"),
            "permissions": payload.get("permissions", {}),
        }

        return await call_next(request)

    def _is_public_path(self, path: str) -> bool:
        return path in self.PUBLIC_PATHS

    def _is_protected_path(self, path: str) -> bool:
        return any(path.startswith(prefix) for prefix in self.protected_prefixes)

    @staticmethod
    def _split_authorization_header(authorization: str) -> tuple[str, str]:
        parts = authorization.split(" ", 1)
        if len(parts) != 2:
            return "", ""
        return parts[0], parts[1].strip()

    @staticmethod
    def _decode_token(token: str) -> dict[str, Any] | None:
        secrets = [
            config.SECRET_KEY_ADMIN,
            config.SECRET_KEY_USER,
        ]

        for secret in secrets:
            if not secret:
                continue

            try:
                return jwt.decode(token, secret, algorithms=["HS256"])
            except jwt.ExpiredSignatureError:
                return None
            except jwt.InvalidTokenError:
                continue

        return None

    @staticmethod
    def _error_response(status_code: int, message: str) -> JSONResponse:
        return JSONResponse(
            status_code=status_code,
            content={
                "detail": message,
            },
        )


def get_auth_payload(request: Request) -> dict[str, Any]:
    """
    Helper lấy payload đã được middleware lưu vào request.state.auth.
    Dùng trong route/service nếu cần biết admin/user hiện tại.
    """
    return getattr(request.state, "auth", {})


def get_current_admin_from_request(request: Request) -> dict[str, Any]:
    auth = get_auth_payload(request)

    if auth.get("role") != "admin":
        return {}

    return auth
