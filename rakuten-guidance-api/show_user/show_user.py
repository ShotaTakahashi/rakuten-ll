import pymysql.cursors
import json
from pdb import set_trace

def get_user_from_db(user_id):
    connection = pymysql.connect(host='localhost',
            user='zhaoxin',
            password='sinnjiru',
            charset='utf8mb4',
            db='Rakuten_ll',
            cursorclass=pymysql.cursors.DictCursor)

    with connection.cursor() as cursor:
        sql = "SELECT * FROM `%s` WHERE guidance_id=%d"%('guidance' ,user_id)
        cursor.execute(sql)
        result = cursor.fetchone()
        print(json.dumps(result))
        return json.dumps(result)