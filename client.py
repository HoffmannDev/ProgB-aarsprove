import urllib3
import json

f = open("test_tables.txt", "r")
tables = f.read()
f.close()

http = urllib3.PoolManager()
try:
    r = http.request(
        'POST',
        '127.0.0.1:5000/submit',
        fields = {'tables' : tables})
except urllib3.exceptions.MaxRetryError:
    print("Connection refused")
