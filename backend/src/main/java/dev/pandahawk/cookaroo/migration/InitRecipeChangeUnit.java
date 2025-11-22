package dev.pandahawk.cookaroo.migration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.pandahawk.cookaroo.recipe.Recipe;
import dev.pandahawk.cookaroo.recipe.RecipeRepository;
import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.io.InputStream;
import java.util.List;

@Slf4j
@ChangeUnit(id = "init-recipes", order = "001", author = "pandahawk")
public class InitRecipeChangeUnit {

    private final RecipeRepository repo;
    private final ObjectMapper objectMapper;

    public InitRecipeChangeUnit(RecipeRepository repo, ObjectMapper objectMapper) {
        this.repo = repo;
        this.objectMapper = objectMapper;
    }

    @Execution
    public void migration() {
        try {
            var resource = new ClassPathResource("db/recipes.json");
            try (InputStream is = resource.getInputStream()) {
                List<Recipe> seeds = objectMapper.readValue(is,
                        new TypeReference<>() {
                        });
                log.info("🌱 Seeding {} recipes from JSON…", seeds.size());

                repo.saveAll(seeds);
                log.info("✅ Sample recipes inserted.");
            }
        } catch (Exception e) {
            throw new IllegalStateException("Failed to load seed posts from " +
                    "classpath: db/recipes.json", e);
        }
    }

    @RollbackExecution
    public void rollback(MongoTemplate mongoTemplate) {
        mongoTemplate.dropCollection(Recipe.class);
    }
}
