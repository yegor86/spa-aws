provider "aws" {
  region = "${var.aws_profile}"
  profile = "${var.aws_region}"
}
