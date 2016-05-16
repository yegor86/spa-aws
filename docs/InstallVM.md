## Install VM with AWS CLI and Nodejs

1\. Run a vm with nodejs
```
$ vagrant up spa
```
2\. SSH to the vm
```
$ vagrant ssh spa
```
3\. [Create Administrative user for AWS](CreateAWSUser.md)

4\. Configure AWS profile
```
$ aws configure --profile spa

# Enter the access keys when prompted. Enter _us-east-1_ as default region
```







