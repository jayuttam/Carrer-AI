variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}


variable "ami_id" {
  description = "Ubuntu AMI ID for the selected AWS region"
  type        = string
}


variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}


variable "key_name" {
  description = "Existing AWS EC2 key pair name"
  type        = string
}


variable "docker_image" {
  description = "CareerAI Docker Hub image"
  type        = string
  default     = "jayuttam/careerai:1.0"
}