sudo apt-get update
# sudo apt-get -y upgrade

sudo apt-get -y install dos2unix
sudo apt-get -y install python-pip
sudo pip install awscli

# dos2unix /mnt/spa/sspa /mnt/spa/sspa
find /mnt/spa -type f -exec dos2unix {} \;

# Install notejs
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y zip

# Install terrafrom 
sudo wget https://releases.hashicorp.com/terraform/0.6.15/terraform_0.6.15_linux_amd64.zip
unzip terraform_0.6.15_linux_amd64.zip -d terraform
echo "PATH=$PATH:~/terraform" >> ~/.bash_profile


# Chdir to the project directory 
echo "cd /mnt/spa" >> ~/.bashrc