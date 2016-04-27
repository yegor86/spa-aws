## Install VM with AWS CLI and Nodejs

1\. Run a vm with nodejs

```bash
$ vagrant up spa
```
2\. SSH to the vm

```bash
$ vagrant ssh spa
```
3\. [Create Administrative user for AWS](CreateAWSUser.md)
4\. Configure AWS profile

```bash
5 aws configure --profile spa-aws

# Enter the access keys when prompted. Enter _us-east-1_ as default region
```







