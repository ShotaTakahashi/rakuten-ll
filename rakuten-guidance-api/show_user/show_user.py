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
        sql = "SELECT * FROM `guidance` WHERE guidance_id=%d "%(user_id)
        cursor.execute(sql)
        guidance_mes = cursor.fetchone()

        sql = "SELECT language FROM language WHERE language_id in (SELECT language_id FROM `available_language` WHERE guidance_id=%d)"%(user_id)
        cursor.execute(sql)
        languages = cursor.fetchall()
        guidance_mes.update({'language':[]})
        for lan in languages:
            guidance_mes['language'].append(lan['language'])
        
        sql = "SELECT region FROM region WHERE region_id in (SELECT region_id FROM `activity_area` WHERE guidance_id=%d)"%(user_id)
        cursor.execute(sql)
        regions = cursor.fetchall()
        guidance_mes.update({'region':[]})
        for lan in regions:
            guidance_mes['region'].append(lan['region'])
        return json.dumps(guidance_mes)


