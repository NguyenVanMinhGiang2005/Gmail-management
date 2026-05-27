# import bcrypt


# def hash_password(password: str) -> str:
#     return pwd_context.hash(password)


# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)

import bcrypt

def hash_password(password: str) -> str:
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    
    # Trả về kết quả dưới dạng chuỗi để lưu vào database
    return hashed.decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    # Chuyển mật khẩu nhập vào và mật khẩu đã lưu sang bytes
    pwd_bytes = password.encode('utf-8')
    hashed_bytes = hashed_password.encode('utf-8')

    return bcrypt.checkpw(pwd_bytes, hashed_bytes)