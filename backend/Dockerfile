# ------ Build ------
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn -q -e -B dependency:go-offline

COPY src ./src
RUN mvn -q -e -B package


# ------ Run ------
FROM eclipse-temurin:21-jre

# Create non-root user
RUN useradd -r -u 1001 cookaroo

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

USER cookaroo

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
