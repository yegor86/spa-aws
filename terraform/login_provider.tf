resource "template_file" "login_provider_config" {
    template = "${file("${path.module}/../conf/cognito/config.json.tpl")}"
    vars {
    	login_provider = "${var.login_provider}"
    }
    provisioner "local-exec" {
        command ="echo \"${self.rendered}\" > ${path.module}/../conf/cognito/config.json"
    }
}

resource "template_file" "login_provider_html" {
    template = "${file("${path.module}/../app/index.html.tpl")}"
    vars {
    	login_provider = "${var.login_provider}"
    }
    provisioner "local-exec" {
        command ="echo \"${self.rendered}\" > ${path.module}/../app/index.html"
    }
}