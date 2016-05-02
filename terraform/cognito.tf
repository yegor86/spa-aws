resource "null_resource" "create_identity_pool" {
 
    provisioner "local-exec" {
        command = "${path.module}/../conf/cognito/cognito.sh ${var.identity_pool_name} ${path.module}/../conf/cognito"
    }
}

resource "template_file" "config" {
    template = "${file("${path.module}/../app/js/config.js.tpl")}"
 
}

resource "null_resource" "config" {
    provisioner "local-exec" {
        command =<<EOF
echo "${replace(template_file.config.rendered, "#poolId", "$(${path.module}/../conf/cognito/jsed.py ${path.module}/../conf/cognito/target/pool_info.json 'IdentityPoolId')")}" > ${path.module}/../app/js/config.js
EOF
    }
}