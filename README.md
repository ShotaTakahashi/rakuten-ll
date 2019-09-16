# rakuten-ll
Training in Cebu.
## rakuten-guidance-api
Necessary package

- flask
- pymysql

### Create Example Date
You need database.json. For example,
```
// rakuten-ll/rakuten-gudance-api/databse.json
{
  "host": "127.0.0.1",
  "user": "root",
  "password": "",
  "database": "Rakuten_ll"
}
```
Then, 
```
cd rakuten-ll/rakuten-guidance-api
python data-create.py
```

### Start API (flask)

```
cd rakuten-ll/rakuten-guidance-api
python app.py
```
Then, you can access `rakuten-ll/rakuten-guidance-view/html/top.html`.
### Access API
If you start in localhost, in your browser you write following http request.
```
http://127.0.0.1:5000/teachers/search/?user_id=0 
```