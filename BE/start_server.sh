#!/bin/sh
CURDIR=$(pwd)
SRCDIR="src"

# export PYTHONPATH="$PYTHONPATH:$CURDIR$SRCDIR"

pipenv run python src/api_server.py
