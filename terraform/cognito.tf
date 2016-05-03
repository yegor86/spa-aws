resource "null_resource" "create_identity_pool" {
 
    provisioner "local-exec" {
        command = "${path.module}/../conf/cognito/cognito.sh create_pool ${var.identity_pool_name} ${path.module}/../conf/cognito"
    }
}

resource "template_file" "generated_role_policy" {
    depends_on = ["null_resource.create_identity_pool"]
    template = "${file("${path.module}/../conf/cognito/assume_role_policy.json")}"
    vars {}
}

resource "aws_iam_role" "cognito_role" {
    depends_on = ["template_file.generated_role_policy"]
    name = "${var.identity_pool_name}_cognito_role"
    assume_role_policy = "${template_file.generated_role_policy.rendered}"
}

resource "null_resource" "update_identity_pool_role" {
 	depends_on = ["aws_iam_role.cognito_role"]

    provisioner "local-exec" {
        command = "${path.module}/../conf/cognito/cognito.sh update_role ${aws_iam_role.cognito_role.arn} ${path.module}/../conf/cognito"
    }
}

resource "template_file" "config" {
    depends_on = ["null_resource.update_identity_pool_role"]

    template = "${file("${path.module}/../app/js/config.js.tpl")}"
    vars {}
}

resource "null_resource" "config" {
    depends_on = ["template_file.config"]

    provisioner "local-exec" {
        command =<<EOF
echo "${replace(template_file.config.rendered, "#poolId", "$(${path.module}/../conf/cognito/jsed.py ${path.module}/../conf/cognito/target/pool_info.json 'IdentityPoolId')")}" > ${path.module}/../app/js/config.js
EOF
    }
}