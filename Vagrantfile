# -*- mode: ruby -*-
# vi: set ft=ruby :

$script = <<SCRIPT
echo I am provisioning...
date > /etc/vagrant_provisioned_at
SCRIPT

Vagrant.configure("2") do |config|
  config.vm.provision "shell", inline: $script

  config.vm.define "spa", primary: true do |spa|
    spa.vm.box = "ubuntu/trusty64"
    spa.vm.box_url = "https://atlas.hashicorp.com/ubuntu/boxes/trusty64"
    spa.vm.host_name = "spa"

    spa.vm.synced_folder ".", "/mnt/spa", :create => true
    spa.vm.provision :shell, inline: $script
    spa.vm.provision :shell, :path => "vagrant-init/bootstrap.sh"
    spa.vm.network "forwarded_port", guest: 9293, host: 9293
  end
end
