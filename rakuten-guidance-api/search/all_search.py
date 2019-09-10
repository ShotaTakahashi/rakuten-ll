import pymysql.cursors
import json
from show_user.show_user import get_user_from_db

def get(request_params):
    region = request_params.get('region')
    language = request_params.get('language')
    sex = request_params.get('sex')
    price_low = request_params.get('price_low')
    price_high = request_params.get('price_high')
    age_low = request_params.get('age_low')
    age_high = request_params.get('age_high')
    rating_low = request_params.get('rating_low')
    rating_high = request_params.get('rating_high')

    with open('./database.json', 'r') as f:
        config = json.load(f)

    connection = connect_db(config['host'], config['user'], config['password'], config['database'])
    result = get_guidance_info(connection, sex, language, region, price_low, price_high, rating_low, rating_high, age_low, age_high)
    
    guidance_id_set = set()
    for e in result:
        guidance_id_set.add(e['guidance_id'])

    parsed_result = {}
    cnt = 0
    for guidance_id in guidance_id_set:
        parsed_result[cnt] = json.loads(get_user_from_db(guidance_id))
        cnt += 1
    guidances_json = json.dumps(parsed_result)
    
    return guidances_json

def connect_db(host, user, password, db):
    connection = pymysql.connect(host = host,
                                 user = user,
                                 password = password,
                                 db = db,
                                 charset = 'utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    return connection

def get_guidance_info(connection, sex, language, region, price_low, price_high, rating_low, rating_high, age_low, age_high):
    result = None
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * \
                   FROM `guidance` g \
                   LEFT JOIN `available_language` avalan ON g.guidance_id = avalan.guidance_id \
                   LEFT JOIN `activity_area` actarea ON g.guidance_id = actarea.guidance_id \
                   LEFT JOIN `language` l ON l.language_id = avalan.language_id \
                   LEFT JOIN `region` r ON r.region_id = actarea.region_id \
                   WHERE `sex`=%s AND \
                         `language`=%s AND \
                         `region`=%s AND \
                         `price` >= %s AND `price` <= %s AND \
                         `rating` >= %s AND `rating` <= %s AND \
                         `age` >= %s AND `age` <= %s"
            cursor.execute(sql, (sex, language, region, price_low, price_high, rating_low, rating_high, age_low, age_high, ))
            result = cursor.fetchall()
    finally:
        connection.close()
        return result