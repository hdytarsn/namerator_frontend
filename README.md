<h1 align="center">Namerator Frontend</h1>

<p align="center">
<a href="https://github.com/hdytarsn/namerator_backend">Go Namerator Backend</a>
    </p>

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/hdytarsn/namerator_frontend">
    <img src="http://game.namerator.fun/img/logo/logo-bk.png" alt="Logo" width="350">
  </a>
  <p align="center">
Namerator is a graduation project prepared for the Kodluyoruz-Atölye15 javascript bootcamp. 🎓
    <br />
    <br />
    <a href="http://game.namerator.fun/">View Demo</a>
      <br>
        <p align="center">(You probably cant play on demo because the SSL-Microphone Issues, you can play locally)</p>
  </p>
</p>


<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#notes">Notes</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#message-to-atölye-15">Message To Atölye15</a></li>
    <li><a href="#thanks">Thanks</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## Notes

Projects base configration (store/constants) set to deployed backend routes so you can play without local backend setup.
Single player mode not okay right now so only multiplayer mode open in backend and front end.
You can sign up to play (no email confirmation) or predefined users:

mail: atolye15@atolye15.com
password: atolye15

mail: kodluyoruz@kodluyoruz.com
password: kodluyoruz


## Built With

* [VueJs](https://vuejs.org/)
* [Argon UI Kit](https://github.com/creativetimofficial/vue-argon-design-system)
* [Laravel Echo](https://github.com/laravel/echo)
* [Socket IO](https://socket.io/)
* [NPM)](https://www.npmjs.com/)

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
    API_BASE_URL: "http://namerator.fun/api",
    PUSHER_APP_KEY: "8cf0e37a457627fb2630",
    PUSHER_CLUSTER: "eu"
   ```
 
4. Serve on local machine
 ```sh
    npm run serve
   ```
4. Build
 ```sh
   npm run build
   ```


## Message to Atölye 15!

Hello there! 
It was the first project of many things for me.
<ul>
<li>It's my first VueJs project which i created (except basic todo apps 🤪)</li>
<li>It's my first API Authenticated project.</li>
<li>It's my first Web Socket project</li>
<li>The first project given by by Atölye15. I hope i can get more in future... 😍</li>
</ul>
I know it doesn't include the exac requested project, but I wanted to try something different and learn new techs. 💡
There is still lots of bugs on project 🤫 but this is the only project i've had fun working on in a long time so i will continue to develop!
<br>
I hope one day it will be possible to write code💡 and do crazy stuff🤘 together in the office. 🤝🤝🤝

## Thanks!
Special thanks to [Atölye15](https://www.atolye15.com) and [Kodluyoruz](https://www.kodluyoruz.org) 


## Contact
Hidayet Arasan - [Web Site](https://hidayetarasan.com) - info@hidayetarasan.com
