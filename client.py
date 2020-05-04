import urllib3
import json
import time
from random import randint

ms = int(round(time.time() * 1000))
gen_table = lambda: str(ms+random.randint(100000,900000)) + " " + str(randint(0,100) + " " + str(randint(0,100)))


http = urllib3.PoolManager()
try:
    r = http.request(
        'POST',
        '127.0.0.1:5000/submit',
        fields = {'table' : gen_table()})
except urllib3.exceptions.MaxRetryError:
    print("Connection refused")
