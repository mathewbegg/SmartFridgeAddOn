#!/bin/bash
#Connects to ec2 instance
#Optional Argument: path to key, otherwise uses default path
ssh -i ${1:-"../smart-fridge-ec2-key.pem"} ec2-user@ec2.inmyfridge.info