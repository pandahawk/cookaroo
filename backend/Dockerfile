# ------ Build ------
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn -e -B -ntp package


# ------ Run ------
FROM eclipse-temurin:21-jre

# Create non-root user
RUN useradd -r -u 1001 cookaroo

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

USER cookaroo

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
