## Install VM with AWS CLI and Nodejs

1. Run a vm with nodejs
```bash
$ vagrant up spa
```

2. SSH to the vm
```bash
$ vagrant ssh spa
```

3. Naviagate to project dir
```bash
$ cd /mnt/spa
```

4. [Create Administrative user for AWS](CreateAWSUser.md)
5. Configure AWS profile
```bash
$ aws configure --profile spa-aws

# Enter the access keys when prompted. Enter _us-east-1_ as default region
```







