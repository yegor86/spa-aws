## Deploy application 

1\. Run Terraform script
```
$ cd terraform
$ terraform apply
```
2\. Deploy to s3 bucket
```
$ npm install
$ aws s3 sync app/ s3://s3-spa.demos3.com/ --acl public-read --profile spa 
$ aws dynamodb batch-write-item --request-items file://conf/dynamodb/sampledata/Problems.json --profile spa

# Enjoy http://s3-spa.demos3.com.s3-website-us-east-1.amazonaws.com
```

3\. Deploy locally
```
$ npm install
$ npm start

# Enjoy http://localhost:9292/
```

4\. Undeploy
```
$ cd terraform/
$ aws s3 rm s3://s3-spa.demos3.com --recursive --profile spa
$ terraform destroy
```