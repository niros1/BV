

# Getting started with Backend service

## Change dir to BE
cd BE 

## Install pipenv package manager
pip install --user pipenv

## Install libraries and virtual environment
pipenv install

## Run the DB
docker run -d=true -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=postgres postgres:11

## Create BV DB Schem
pipenv run python src/migration.py


## Populate data - process emotions model
chmode 775 etl.sh (in case the file created without permissions)
./etl.sh

## Run the BE service
./start_server.sh

make sure the server is runnin fine by accessing http://127.0.0.1:5000/api/v1/resources/users/all from the browser.



# Getting started with web app