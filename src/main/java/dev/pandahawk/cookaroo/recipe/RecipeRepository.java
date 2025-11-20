package dev.pandahawk.cookaroo.recipe;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
    Optional<Recipe> findByPublicId(String publicId);
}
