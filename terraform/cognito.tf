resource "null_resource" "create_identity_pool" {
 
    provisioner "local-exec" {
        command = "${path.module}/../conf/cognito/cognito.sh ${var.identity_pool_name} ${path.module}/../conf/cognito"
    }
}

resource "template_file" "config" {
    template = "${file("${path.module}/../app/js/config.js.tpl")}"
 
    vars {
        poolId = "tttttttttttttt"
    }
 
    provisioner "local-exec" {
        command = <<EOM
#!/bin/bash
cat > ${path.module}/../app/js/config.js <<'EOF'
${self.rendered}
EOF
EOM
    }
}