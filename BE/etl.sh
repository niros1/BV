find . -name '.DS_Store' -type f -delete
pipenv run python src/etl.py images
