variable "aws_profile" {
    default = "spa"
} 
 
variable "aws_region" {
    default = "us-east-1"
}

variable "identity_pool_name" {
    default = "id_pool1"
}

variable "lambda_name" {
    default = "checkAnswer"
}

variable "login_provider" {
	default = "105303240909-s1498bdjvam1nkfpr1fmo9d2bce5pbkv.apps.googleusercontent.com"
}