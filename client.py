import urllib3
import json
import time
ms = int(round(time.time() * 1000))
tables = str(ms+600000) + " 1 0\n" + str(ms+928371) + " 0 1\n" + str(ms+928371) + " 1 1"

"""
f = open("test_tables.txt", "r")
tables = f.read()
f.close()
"""

http = urllib3.PoolManager()
try:
    r = http.request(
        'POST',
        '127.0.0.1:5000/submit',
        fields = {'tables' : tables})
except urllib3.exceptions.MaxRetryError:
    print("Connection refused")
