# JustStreamIt

1. Prerequisites

   - `node >= 16.13`, `npm`
   - For the local API: `python >= 3.6`, `pip`, `pipenv`

2. Clone the repository

   - _recommended way_

   ```bash
   # Project and API submodule
   $ git clone --recurse-submodules https://github.com/josayko/JustStreamIt.git
   ```

   - _alternative way_

   ```bash
   # Project
   $ git clone https://github.com/josayko/JustStreamIt.git

   # API submodule
   $ cd JustStreamIt/
   $ git submodule init
   $ git submodule update
   ```

3. Start the project

   ```bash
   $ cd JustStreamIt/

   # Initialize required package (axios)
   $ npm install

   # Initialize and run API at http://localhost:8000/api/v1/titles/
   $ npm start
   ```

   - Open `dist/index.html` in a web browser. That's it !
