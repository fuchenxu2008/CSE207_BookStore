# Laravel BookStore
A book store web app to simulate the design and implementation procedure of real world software development as illustrated in CSE 207. This app is built with PHP framework Laravel.

## Environment Setup

1. Install PHP/Composer/MySQL
2. Run `composer update -v` to update dependencies
3. Run `composer install` to install dependencies to 'vendor/'
4. Follow `.env` file to create database and setup user permission.

   ```sql
   CREATE USER steve@localhost IDENTIFIED WITH mysql_native_password BY 'fcx20121221';

   GRANT ALL PRIVILEGES ON * . * TO 'steve'@'localhost';

   FLUSH PRIVILEGES;
   ```

5. Run `php artisan migrate` to create tables
6. Run `php artisan serve` to start app on port 8000

> Note the app uses Google Book API, so Internet is required :)