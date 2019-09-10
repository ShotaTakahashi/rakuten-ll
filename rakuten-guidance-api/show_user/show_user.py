import pymysql.cursors
import json


class NotFoundExceptionError(Exception):
    pass


def get_user_from_db(user_id):
    with open('./database.json', 'r') as f:
        config = json.load(f)
        host = config['host']
        user = config['user']
        password = config['password']
        database = config['database']

    connection = pymysql.connect(host=host,
            user=user,
            password=password,
            charset='utf8mb4',
            db=database,
            cursorclass=pymysql.cursors.DictCursor)

    with connection.cursor() as cursor:
        sql = "SELECT * FROM `guidance` WHERE guidance_id=%s "%(user_id)
        cursor.execute(sql)
        guidance_mes = cursor.fetchone()

        if guidance_mes is None:
            raise NotFoundExceptionError("Guidance Id does not exist")

        sql = "SELECT language FROM language WHERE language_id in (SELECT language_id FROM `available_language` WHERE guidance_id=%s)"%(user_id)
        cursor.execute(sql)
        languages = cursor.fetchall()
        guidance_mes.update({'language':[]})
        for lan in languages:
            guidance_mes['language'].append(lan['language'])
        
        sql = "SELECT region FROM region WHERE region_id in (SELECT region_id FROM `activity_area` WHERE guidance_id=%s)"%(user_id)
        cursor.execute(sql)
        regions = cursor.fetchall()
        guidance_mes.update({'region':[]})
        for lan in regions:
            guidance_mes['region'].append(lan['region'])
        return json.dumps(guidance_mes)