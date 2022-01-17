FROM openjdk:17-oracle
COPY target/user-manager-backend-0.0.1-SNAPSHOT.jar /app/backend.jar
WORKDIR /app
CMD ["java", "-jar", "/app/backend.jar"]
EXPOSE 8081
