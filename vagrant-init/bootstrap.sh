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
sudo wget https://releases.hashicorp.com/terraform/0.6.16/terraform_0.6.16_linux_amd64.zip
unzip terraform_0.6.16_linux_amd64.zip -d terraform
echo "PATH=$PATH:~/terraform" >> ~/.bash_profile

# Instll apex.run
sudo wget https://github.com/apex/apex/releases/download/v0.8.0/apex_linux_amd64
sudo chmod +x apex_linux_amd64
mkdir apex
mv apex_linux_amd64 apex/apex
echo "PATH=$PATH:~/apex" >> ~/.bash_profile

# Chdir to the project directory 
echo "cd /mnt/spa" >> ~/.bashrc