# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: jaeskim <jaeskim@student.42seoul.kr>       +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2022/02/25 18:32:18 by jaeskim           #+#    #+#              #
#    Updated: 2022/02/27 01:23:25 by jaeskim          ###   ########seoul.kr   #
#                                                                              #
# **************************************************************************** #

NAME=inception
TARGET=srcs/docker-compose.yml

all: up

up:
	docker-compose -p ${NAME} -f ${TARGET} up -d

down:
	docker-compose -p ${NAME} -f ${TARGET} down

fdown:
	docker-compose -p ${NAME} -f ${TARGET} down --rmi all --volumes all

start:
	docker-compose -p ${NAME} -f ${TARGET} start

stop:
	docker-compose -p ${NAME} -f ${TARGET} stop

build:
	docker-compose -p ${NAME} -f ${TARGET} build

fbuild:
	docker-compose -p ${NAME} -f ${TARGET} build --no-cache

logs:
	docker-compose -p ${NAME} -f ${TARGET} logs

.PHONY: all up down fdown start stop build fbuild
