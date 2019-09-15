import pymysql.cursors
import numpy as np
import json


# Connect to the database
class SQL():
    def __init__(self, host, user, password, database_name):
        self.connection = pymysql.connect(host=host,
                                          user=user,
                                          password=password,
                                          charset='utf8mb4',
                                          cursorclass=pymysql.cursors.DictCursor)
        self.creat_database(database_name)
        self.connection = pymysql.connect(host=host,
                                          user=user,
                                          password=password,
                                          charset='utf8mb4',
                                          db=database_name,
                                          cursorclass=pymysql.cursors.DictCursor)
        
    def creat_database(self, database_name):
        with self.connection.cursor() as cursor:
            sql = "CREATE DATABASE IF NOT EXISTS %s;" % database_name
            cursor.execute(sql)
            self.connection.commit()

    def creat_table_sql(self, table_name, items_dict, key=None):
        itemMess = ','.join(['`%s` %s' % (key[0],key[1]) for key in items_dict])
        if key is not None:
            itemMess += ', `{0}` {1}'.format(key[0], key[1])
        print(itemMess)
        with self.connection.cursor() as cursor:
            sql = "CREATE TABLE IF NOT EXISTS `%s` (%s);"%(table_name, itemMess)
            cursor.execute(sql)
            self.connection.commit()

    def insert_sql(self, tablename, keyValueItems, primary_key_ind=0):
        tuple_keyvalue = np.array(keyValueItems)
        keys = tuple_keyvalue[:,0]
        values = tuple_keyvalue[:,1]
        keysStr = ','.join(["`%s`"%i for i in keys])
        valuesStr = ','.join(["'%s'"%i for i in values])
        # sql = "INSERT INTO `wordvector2` (`vector`,`word`) VALUES ('1111','is')"
        with self.connection.cursor() as cursor:
            sql = "INSERT IGNORE INTO `%s` (%s) VALUES (%s)" % (tablename,keysStr,valuesStr)
            print(sql)
            cursor.execute(sql)
            self.connection.commit()

    def SelectSQL(self,tableName,keyList):
        keyMess = ','.join(["`%s`"%i for i in keyList])
        with self.connection.cursor() as cursor:
            sql = "SELECT %s FROM `%s`"%(keyMess,tableName)
            cursor.execute(sql)
            result = cursor.fetchone()
            return result

    def DeleteALLSQL(self,tablename):
        with self.connection.cursor() as cursor:
            sql = "TRUNCATE TABLE %s" % (tablename)
            cursor.execute(sql)

    def excute(self, excution):
        with self.connection.cursor() as cursor:
            return cursor.execute(excution)

    def ExitSQL(self):
        self.connection.close()


if __name__ == "__main__":
    # Define format of tables
    guidance_itemsDict = (   
        ('id', 'INT PRIMARY KEY AUTO_INCREMENT'),
        ('name', 'VARCHAR(255)'),
        ('sex', 'VARCHAR(255)'),
        ('price', 'INT'),
        ('age', 'INT'),
        ('rating', 'FLOAT'))
    language_itemsDict = (   
        ('id', 'INT PRIMARY KEY AUTO_INCREMENT'),
        ('language', 'VARCHAR(255)'))
    available_language_itemsDict = (   
        ('id', 'INT PRIMARY KEY AUTO_INCREMENT'),
        ('guidance_id', 'INT'),
        ('language_id', 'INT'))
    region_itemsDict = (   
        ('id', 'INT PRIMARY KEY AUTO_INCREMENT'),
        ('region', 'VARCHAR(255)'))
    activity_area_itemsDict = (   
        ('id', 'INT PRIMARY KEY AUTO_INCREMENT'),
        ('guidance_id', 'INT'),
        ('region_id', 'INT'))
    
    # Creat tables
    with open('./database.json', 'r') as f:
        config = json.load(f)
        mysql = SQL(config['host'], config['user'], config['password'], config['database'])
    inserts = []
    mysql.creat_database('Rakuten_ll')
    mysql.creat_table_sql('guidance', guidance_itemsDict)
    mysql.creat_table_sql('language', language_itemsDict)
    mysql.creat_table_sql('available_language', available_language_itemsDict)
    mysql.creat_table_sql('region', region_itemsDict)
    mysql.creat_table_sql('activity_area', activity_area_itemsDict)
    
    # Creat examples 
    guidance_table_data = []
    language_table_data = []
    available_language_table_data = []
    region_table_data = []
    activity_area_table_data = []

    languages = ['English', 'Japanese', 'Pokémon', 'French', 'German', 'Chinese']
    for i, lan in enumerate(languages):
        language_table_data.append((
            ('language', lan)))
    for item in language_table_data:
        mysql.insert_sql('language', item)

    available_language_dict = {0: (0, 1), 1: (0, 1, 3, 4, 5), 2: (0, 1), 3: (1, 2)}
    available_language_list = [(key, value) for key in available_language_dict for value in available_language_dict[key] ]
    for i, (k, v) in enumerate(available_language_list):
        available_language_table_data.append((
            ('guidance_id', k), 
            ('language_id', v)))
    for item in available_language_table_data:
        mysql.insert_sql('available_language', item)

    regions = ['sinjuku', 'sibuya', 'chiyoda', 'sinagawa', 'meguro']
    for i, reg in enumerate(regions):
        region_table_data.append((
            ('region', reg)))
    for item in region_table_data:
        mysql.insert_sql('region', item)

    activity_area_dict = {0: (0, 1), 1: (0, 1, 2, 3, 4), 2: (3,), 3: (4,)}
    activity_area_list = [(key, value) for key in activity_area_dict for value in activity_area_dict[key]]
    for i, (k, v) in enumerate(activity_area_list):
        activity_area_table_data.append((
            ('guidance_id', k), 
            ('region_id', v)))
    for item in activity_area_table_data:
        mysql.insert_sql('activity_area', item)

    guidance_table_data.append((
        ('name', 'Mikki'),
        ('sex', 'M'),
        ('price', 3000),
        ('age', 54),
        ('rating', 4.2)))
    guidance_table_data.append((
        ('name', 'Doraemon'),
        ('sex', 'M'),
        ('price', 4000),
        ('age', 200),
        ('rating', 3.7)))
    guidance_table_data.append((
        ('name', 'Shizuka'),
        ('sex', 'F'),
        ('price', 2000),
        ('age', 10),
        ('rating', 2.5)))
    guidance_table_data.append((
        ('name', 'Nyarth'),
        ('sex', 'M'),
        ('price', 4000),
        ('age', 5),
        ('rating', 3.2)))
    for item in guidance_table_data:
        mysql.insert_sql('guidance', item)
        
    mysql.ExitSQL()
