

# Getting started with Backend service

### Change dir to BE
```console
$ cd BE 
```
### Install pipenv package manager
```console
$ pip install --user pipenv
```
### Install libraries and virtual environment
```console
$ pipenv install
```
### Run the DB
```console
$ docker run -d=true -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=postgres postgres:11
```
You may connect to the DB using pgAdmin (or any other tool) using this connection string: postgresql://postgres:password@0.0.0.0/postgres

### Create BV DB Schem
```console
$ pipenv run python src/migration.py
```

### Populate data - process emotions model

```console
$ chmode 775 etl.sh
$ ./etl.sh
```



### Run the BE service
```console
$ ./start_server.sh
```

make sure the server is running fine by accessing http://127.0.0.1:5000/api/v1/resources/users/all from the browser.
You should get list of all the images.



# Getting started with web app

### Change dir to FE
open another terminal and move the FE directory
```console
$ cd FE
```


### Install dependancy packages
```console
$ npm install
```
* the site was developed & checked with node v10.15.3, newer version should run just fine 



### Bring up the web server
```console
$ npm run start
```

the site should be available on http://localhost:3000/

