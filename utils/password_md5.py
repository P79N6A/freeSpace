import hashlib
def get_hash(pwd):
    j=hashlib.md5()
    j.update(pwd.encode())
    return str(j.digest())