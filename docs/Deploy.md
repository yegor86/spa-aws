## Deploy application 

1. Run Terraform script
```
$ cd terraform
$ terraform apply
```
2. Deploy to s3 bucket
```
$  aws --profile spa s3 sync app/ s3://s3-spa.demos3.com/ --acl public-read
```