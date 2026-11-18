# Test cases for hafez-baseline.yml (run by `opengrep test .opengrep`). Never imported:
# a line marked ruleid must be matched by the rule it names, a line marked ok must not.
import hashlib
import hmac
import os
import pickle
import ssl
import subprocess

import jwt
import requests
import yaml
from fastapi import FastAPI
from sqlalchemy import text

user_input = input()
cur = None

# ruleid: hafez-python-dynamic-code
eval(user_input)
# ok: hafez-python-dynamic-code
eval("1 + 1")

# ruleid: hafez-python-sql-from-string
cur.execute(f"SELECT * FROM users WHERE id = {user_input}")
# ruleid: hafez-python-sql-from-string
cur.execute("SELECT * FROM users WHERE id = %s" % user_input)
# ruleid: hafez-python-sql-from-string
text(f"SELECT * FROM users WHERE id = {user_input}")
# ok: hafez-python-sql-from-string
cur.execute("SELECT * FROM users WHERE id = %s", (user_input,))

# ruleid: hafez-python-shell-string
subprocess.run(user_input, shell=True)
# ruleid: hafez-python-shell-string
os.system(user_input)
# ok: hafez-python-shell-string
subprocess.run(["git", "log", user_input])

# ruleid: hafez-python-tls-verification-off
requests.get("https://example.com", verify=False)
# ruleid: hafez-python-tls-verification-off
ctx = ssl._create_unverified_context()
# ok: hafez-python-tls-verification-off
requests.get("https://example.com", timeout=5)

# ruleid: hafez-python-jwt-unverified
jwt.decode(user_input, options={"verify_signature": False})
# ok: hafez-python-jwt-unverified
jwt.decode(user_input, "key", algorithms=["HS256"])

# ruleid: hafez-python-unsafe-yaml
yaml.load(user_input)
# ok: hafez-python-unsafe-yaml
yaml.load(user_input, Loader=yaml.SafeLoader)
# ok: hafez-python-unsafe-yaml
yaml.safe_load(user_input)

# ruleid: hafez-python-pickle
pickle.loads(user_input)

# ruleid: hafez-python-debug-mode
app = FastAPI(debug=True)
# ok: hafez-python-debug-mode
app = FastAPI(title="api")

provided_token = user_input
session_token = os.environ["SESSION"]
# ruleid: hafez-python-secret-equality
if provided_token == session_token:
    pass
# ok: hafez-python-secret-equality
if hmac.compare_digest(provided_token, session_token):
    pass
# ok: hafez-python-secret-equality
if provided_token == None:
    pass

# ruleid: hafez-python-weak-hash
hashlib.md5(b"x")
# ok: hafez-python-weak-hash
hashlib.sha256(b"x")

# ruleid: hafez-forwarded-for-identity
client_ip = request.headers.get("X-Forwarded-For")
