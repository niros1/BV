import db

sql_file = open('migration/create.pgsql', 'r')
db.Pcursor().execute(sql_file.read())
