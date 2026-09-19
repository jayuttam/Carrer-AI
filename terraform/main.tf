terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  required_version = ">= 1.5.0"
}


provider "aws" {
  region = var.aws_region
}


# =========================================================
# VPC
# =========================================================

resource "aws_vpc" "careerai_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name    = "CareerAI-VPC"
    Project = "CareerAI"
  }
}


# =========================================================
# PUBLIC SUBNET
# =========================================================

resource "aws_subnet" "careerai_public_subnet" {
  vpc_id                  = aws_vpc.careerai_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name    = "CareerAI-Public-Subnet"
    Project = "CareerAI"
  }
}


# =========================================================
# INTERNET GATEWAY
# =========================================================

resource "aws_internet_gateway" "careerai_igw" {
  vpc_id = aws_vpc.careerai_vpc.id

  tags = {
    Name    = "CareerAI-IGW"
    Project = "CareerAI"
  }
}


# =========================================================
# ROUTE TABLE
# =========================================================

resource "aws_route_table" "careerai_public_rt" {
  vpc_id = aws_vpc.careerai_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.careerai_igw.id
  }

  tags = {
    Name    = "CareerAI-Public-RouteTable"
    Project = "CareerAI"
  }
}


# =========================================================
# ROUTE TABLE ASSOCIATION
# =========================================================

resource "aws_route_table_association" "careerai_public_rta" {
  subnet_id      = aws_subnet.careerai_public_subnet.id
  route_table_id = aws_route_table.careerai_public_rt.id
}


# =========================================================
# SECURITY GROUP
# =========================================================

resource "aws_security_group" "careerai_sg" {
  name        = "careerai-security-group"
  description = "Security group for CareerAI EC2"
  vpc_id      = aws_vpc.careerai_vpc.id

  # SSH
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # CareerAI application
  ingress {
    description = "CareerAI HTTP"
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound internet
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "CareerAI-SG"
    Project = "CareerAI"
  }
}


# =========================================================
# EC2 INSTANCE
# =========================================================

resource "aws_instance" "careerai_ec2" {
  ami           = var.ami_id
  instance_type = var.instance_type

  subnet_id                   = aws_subnet.careerai_public_subnet.id
  vpc_security_group_ids     = [aws_security_group.careerai_sg.id]
  associate_public_ip_address = true

  key_name = var.key_name

  user_data = <<-EOF
              #!/bin/bash

              apt-get update -y

              apt-get install -y docker.io

              systemctl enable docker
              systemctl start docker

              docker pull ${var.docker_image}

              docker run -d \
                --name careerai \
                -p 8000:8000 \
                ${var.docker_image}
              EOF

  tags = {
    Name    = "CareerAI-EC2"
    Project = "CareerAI"
  }
}