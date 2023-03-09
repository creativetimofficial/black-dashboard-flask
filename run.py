# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from flask_migrate import Migrate
from sys import exit
from decouple import config

from apps.config import config_dict
from apps import create_app, db
from apps.home.routes import *

# WARNING: Don't run with debug turned on in production!
DEBUG = config('DEBUG', default=False, cast=bool)

# The configuration
get_config_mode = 'Debug' if DEBUG else 'Production'
print(f"Config Mode: {get_config_mode}")

try:
    # Load the configuration using the default values
    app_config = config_dict[get_config_mode.capitalize()]

except KeyError:
    exit('Error: Invalid <config_mode>. Expected values [Debug, Production] ')

app = create_app(app_config)
Migrate(app, db)

if DEBUG:
    app.logger.info('DEBUG       = ' + str(DEBUG))
    app.logger.info('Environment = ' + get_config_mode)
    app.logger.info('DBMS        = ' + app_config.SQLALCHEMY_DATABASE_URI)

if __name__ == "__main__":
    import os
    API_KEY = os.getenv('API_KEY')


    if API_KEY is not None:
        # FOR RUNNING ON RAILWAY
        print("Running on Railway")
        app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
    else:
        # app.run()
        # FOR RUNNING ON LOCAL
        print("Running on Local")
        app.run(debug=True, port=int(os.getenv("PORT", default=5000)))

    
from apps.home.db import get_people
data = get_people()
it = iter(data['People']).__next__
audioContent = ''
print('enter getJSONReuslt', flush=True)
