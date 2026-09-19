output "vpc_id" {
  value = aws_vpc.careerai_vpc.id
}


output "public_subnet_id" {
  value = aws_subnet.careerai_public_subnet.id
}


output "security_group_id" {
  value = aws_security_group.careerai_sg.id
}


output "ec2_public_ip" {
  value = aws_instance.careerai_ec2.public_ip
}


output "careerai_url" {
  value = "http://${aws_instance.careerai_ec2.public_ip}:8000"
}