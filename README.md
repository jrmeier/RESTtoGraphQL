# REST to GraphQL

A simple example showing off how [GraphQL](https://graphql.org) can simplify developement for API consumers.

## REST examples

To demonstate how a typical REST api works, there's a single endpoint (`/user`), that can be consumed with the standard `GET`,`POST`,`PUT`,and `DELETE` requests.

### Create a user
```curl -X PUT \
  http://localhost:4000/user \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"email":"newuser@users4dayz.com",
	"name":"Micheal Scott"
}'
```
### Get all users
```curl -X GET \
  http://localhost:4000/user \
  -H 'Cache-Control: no-cache'
```

### Get a user or users by given paraments
```curl -X GET \
  'http://localhost:4000/user?email=new@email.com' \
  -H 'Cache-Control: no-cache'
  ```

### Update a user 
```curl -X POST \
  http://localhost:4000/user \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"_id":"5cc132b3a4bff7693c00e95b",
	"name":"Dwight Schrute"
}'
```

### Delete a user 
```
curl -X DELETE \
  http://localhost:4000/user \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"_id": "5cc121bc60732197ceed44c9"
}'
```
