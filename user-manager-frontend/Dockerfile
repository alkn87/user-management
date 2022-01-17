FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY dist/user-manager-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80
