package dev.pandahawk.cookaroo.recipe.dto;

import dev.pandahawk.cookaroo.recipe.Category;
import dev.pandahawk.cookaroo.recipe.Difficulty;
import lombok.Builder;

import java.util.List;
import java.util.Set;

@Builder
public record RecipeResponse(
    String id,
    String title,
    String description,
    Difficulty difficulty,
    List<String> ingredients,
    List<String> steps,
    Set<Category> category,
    int servings
) {
}
