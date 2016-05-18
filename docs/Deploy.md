## Deploy application 

1\. Run Terraform script
```
$ cd terraform
$ terraform apply
```
2\. Deploy to s3 bucket
```
$ npm install
$ aws --profile spa s3 sync app/ s3://s3-spa.demos3.com/ --acl public-read

# Enjoy http://s3-spa.demos3.com.s3-website-us-east-1.amazonaws.com
```

3\. Deploy locally
```
$ npm install
$ npm start

# Enjoy http://localhost:9292/
```