##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#	listen 80;
#	listen [::]:80;
#
#	server_name example.com;
#
#	root /var/www/example.com;
#	index index.html;
#
#	location / {
#		try_files $uri $uri/ =404;
#	}
#}

## For benousborne.com subdomain

server {
	
#	ssl on;
#	ssl_certificate /etc/ssl/benousbornecom.crt;
#	ssl_certificate_key /etc/ssl/benousbornecom.key;

	root /var/www/benousborne.com/html;
	index index.html;
	server_name benousborne.com www.benousborne.com;
	location / {
		try_files $uri $uri/ /index.html;
	}

 #   listen [::]:443 ssl ipv6only=on; # managed by Certbot
 #   listen 443 ssl; # managed by Certbot
#    ssl_certificate /etc/letsencrypt/live/benousborne.com-0001/fullchain.pem; # managed by Certbot
#    ssl_certificate_key /etc/letsencrypt/live/benousborne.com-0001/privkey.pem; # managed by Certbot
#    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
#    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot




}



server {
    if ($host = www.benousborne.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = benousborne.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


	listen 80;
	listen [::]:80;
	server_name benousborne.com www.benousborne.com;
    return 404; # managed by Certbot




}
