# inception

[![jaeskim's 42 inception Score](https://badge42.herokuapp.com/api/project/jaeskim/Inception)](https://github.com/JaeSeoKim/badge42)

> This project aims to broaden your knowledge of system administration by using Docker. You will virtualize several Docker images, creating them in your new personal virtual machine.
>
> ## 📝 PDF
>
> - [**`FILE LINK`**](https://github.com/JaeSeoKim/42cursus/blob/master/pdf/en.subject.Inception.pdf)

## 🚀 Content

This project consists in having you set up a small infrastructure composed of different services under specific rules. The whole project has to be done in a virtual machine. You have to use docker-compose.
Each Docker image must have the same name as its corresponding service.
Each service has to run in a dedicated container.
For performance matters, the containers must be built either from the penultimate stable version of Alpine Linux, or from Debian Buster. The choice is yours.
You also have to write your own Dockerfiles, one per service. The Dockerfiles must be called in your docker-compose.yml by your Makefile.
It means you have to build yourself the Docker images of your project. It is then for- bidden to pull ready-made Docker images, as well as using services such as DockerHub (Alpine/Debian being excluded from this rule).
You then have to set up:

- A Docker container that contains NGINX with TLSv1.2 or TLSv1.3 only.
- A Docker container that contains WordPress + php-fpm (it must be installed and configured) only without nginx.
- A Docker container that contains MariaDB only without nginx.
- A volume that contains your WordPress database.
- A second volume that contains your WordPress website files.
- A docker-network that establishes the connection between your containers. Your containers have to restart in case of a crash.

### Bonus part

For this project, the bonus part is aimed to be simple.
A Dockerfile must be written for each extra service. Thus, each one of them will run inside its own container and will have, if necessary, its dedicated volume.

Bonus list:

- Set up redis cache for your WordPress website in order to properly manage the cache.
- Set up a FTP server container pointing to the volume of your WordPress website.
- Create a simple static website in the language of your choice except PHP (Yes, PHP
is excluded!). For example, a showcase site or a site for presenting your resume.
- Set up Adminer.
- Set up a service of your choice that you think is useful. During the defense, you will have to justify your choice.

### structure

```plaintext
.
├── Makefile
├── README.md
└── srcs
    ├── docker-compose.yml
    └── requirements
        ├── adminer
        │   ├── Dockerfile
        │   ├── conf
        │   │   └── www.conf
        │   └── tools
        │       └── entrypoint.sh
        ├── badge42
        │   ├── Dockerfile
        │   └── tools
        │       └── entrypoint.sh
        ├── ftp
        │   ├── Dockerfile
        │   ├── conf
        │   │   └── vsftpd.conf
        │   └── tools
        │       └── entrypoint.sh
        ├── mariadb
        │   ├── Dockerfile
        │   ├── conf
        │   │   └── mariadb-server.cnf
        │   └── tools
        │       └── entrypoint.sh
        ├── nginx
        │   ├── Dockerfile
        │   ├── conf
        │   │   └── www.conf.template
        │   └── tools
        │       └── entrypoint.sh
        ├── redis
        │   ├── Dockerfile
        │   ├── conf
        │   │   └── redis.conf.template
        │   └── tools
        │       └── entrypoint.sh
        ├── simple-portfolio
        │   ├── Dockerfile
        │   ├── src
        │   └── tools
        │       └── entrypoint.sh
        ├── tools
        └── wordpress
            ├── Dockerfile
            ├── conf
            │   ├── wp-cli.yml
            │   └── www.conf
            └── tools
                └── entrypoint.sh
```
