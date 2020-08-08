# CSV-Data-Parser
Simple web application for parsing CSV Data

# How to set up

- Clone the repository
- Navigate to the source using terminal
- Run **docker-compose up** - This creates images for MySQL Server and PHPMyAdmin. Additionaly, creates database used for the project
- Navigate to **backend** directory using terminal
- Run **composer install**
- Run **cp .env.example .env**
- Run **php artisan migrate**
- Run **php artisan serve**
- Navigate to http://127.0.0.1:8000


# How to use the application

Using of the app is very simple, since that's that its nature. From the first screen, upload of CSV file is possible. **Note that app supports only one type of format currently. This is embedded in the PHP code**

After selecting file, upload, process and saving the data in database is done. **The process is not optimized at all, and can take a lot of time saving all entries**

Once the file content is saved in database (this can be known only if you check whether the database has records), you can navigate to second page **Table View**
Here, simple table is shown, and some details. 

Clicking on each **View** button, navigates us to another page, which shows more details based on the data.
