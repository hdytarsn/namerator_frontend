<h1 align="center">Namerator Frontend</h1>

<p align="center">
<a href="https://github.com/hdytarsn/namerator_backend">Go Namerator Backend</a>
    </p>

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/hdytarsn/namerator_frontend">
    <img src="https://game.namerator.fun/img/logo/logo-bk.png" alt="Logo" width="350">
  </a>
<p align="center"><b>(In Development)</b><p>
      
<p align="center">"Namerator" is a simple name finding game that you can play multiplayer or single player.<br>
It's a weekend project to develop myself in different technologies <a href="#built-with">see below</a>.
    <br />
    <br />
    <a href="https://game.namerator.fun/">View Demo</a>
  </p>
</p>

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#notes">Notes</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#thanks">Thanks</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## Notes

Projects base configration (store/constants) set to deployed backend routes so you can play without local backend setup.
Single player mode in development right now so only multiplayer mode open in backend and frontend.
You can sign up to play (no email confirmation) or predefined users:

mail: userone@namerator.fun
password: userone

mail: usertwo@namerator.fun
password: usertwo


## Built With

* [VueJs](https://vuejs.org/)
* [Argon UI Kit](https://github.com/creativetimofficial/vue-argon-design-system)
* [Laravel Echo](https://github.com/laravel/echo)
* [Socket IO](https://socket.io/)
* [NPM](https://www.npmjs.com/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/hdytarsn/namerator_frontend
   ```
    ```sh
    cd namerator_frontend
   ```
2. Install packages
   ```sh
   npm install
   ```
   or
    ```sh
   yarn install
   ```
3. If you use local backend or own pusher setup change constants (src/storage/constants)
   ```sh
    NODE_ENV:"development",
    BASE_URL:"http://localhost:8080",
    API_BASE_URL: "https://namerator.fun/api", // if you use local backend setup change like "http://localhost:8080/api"
    PUSHER_APP_KEY: "****",
    PUSHER_CLUSTER: "**"
   ```
 
4. Serve on local machine
 ```sh
    npm run serve
   ```
4. Build
 ```sh
   npm run build
   ```

## Thanks!
Special thanks to [Atölye15](https://www.atolye15.com) for evaluating the code and project idea, and [Kodluyoruz](https://www.kodluyoruz.org) for the best JavaScript bootcamp!


## Contact
Hidayet Arasan - [Web Site](https://hidayetarasan.com) - info@hidayetarasan.com
