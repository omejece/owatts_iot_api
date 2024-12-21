this app consist of Api for onewattsolar meter and tcp server for device communication
the app was developed with nodejs and the database use is sql, the database was mapped to with
Sequelize ORM

configure your database parameters in the .env file 
parameters

then run the migration command to migrate the database :  sequelize db:migrate

the api module of the app can be started by running the command : node app.js
