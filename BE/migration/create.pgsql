CREATE SCHEMA IF NOT EXISTS bv;

---------------------------------------------------------
DROP TABLE IF EXISTS bv.users;

CREATE TABLE IF NOT EXISTS bv.users (
    id VARCHAR (128) NOT NULL PRIMARY KEY,
    name VARCHAR (128) NOT NULL,
    age INTEGER,
    sex VARCHAR (32) NOT NULL,
    country VARCHAR (32) NOT NULL,
    -- extra_data jsonb NOT NULL DEFAULT '{}'::jsonb,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW (),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW (),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

---------------------------------------------------------

DROP TABLE IF EXISTS bv.images;

CREATE TABLE bv.images
(
    id character varying(128) COLLATE pg_catalog."default" NOT NULL,
    name character varying(128) COLLATE pg_catalog."default" NOT NULL,
    path character varying(128) COLLATE pg_catalog."default" NOT NULL,
    features character varying(256) COLLATE pg_catalog."default" NOT NULL,
    emotions character varying(256) COLLATE pg_catalog."default" NOT NULL,
    user_id character varying(128) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT images_pkey PRIMARY KEY (id),
    CONSTRAINT "FK_user_id" FOREIGN KEY (user_id)
        REFERENCES bv.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE bv.images
    OWNER to postgres;



---------------------------------------------------------

-- PROCEDURE: bv.addUser(text)
DROP PROCEDURE IF EXISTS bv.addUser();

CREATE OR REPLACE PROCEDURE bv.addUser(
	_id text,
	_name text,
	_age int,
	_sex text,
	_country text
)
LANGUAGE 'plpgsql'
AS $BODY$BEGIN
        INSERT INTO bv.users(id, name, age, country, sex)
        VALUES(_id, _name, _age, _country, _sex);
      END;$BODY$;

---------------------------------------------------------

-- PROCEDURE: bv.addImage()
DROP PROCEDURE IF EXISTS bv.addImage();

CREATE OR REPLACE PROCEDURE bv.addImage(
	_id text,
	_user_id text,
	_name text,
	_path text,
	_features text,
	_emotions text
)
LANGUAGE 'plpgsql'
AS $BODY$BEGIN
        INSERT INTO bv.images(id,user_id, name, path, features, emotions)
        VALUES(_id,_user_id, _name,_path,_features,_emotions);
      END;$BODY$;


---------------------------------------------------------

-- PROCEDURE: bv.getUsers()

DROP PROCEDURE IF EXISTS bv.getUsers();

CREATE OR REPLACE PROCEDURE bv.getUsers()
LANGUAGE 'plpgsql'
AS $BODY$BEGIN
        select * from bv.users;
      END;$BODY$;
---------------------------------------------------------

-- PROCEDURE: bv.getImagesByUser(userId)