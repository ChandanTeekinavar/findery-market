# Build stage
FROM maven:3.8.4-openjdk-11-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:11-jdk-slim
WORKDIR /app
COPY --from=build /app/target/order-service-1.0.0.jar app.jar
EXPOSE 3003
CMD ["java", "-jar", "app.jar"] 