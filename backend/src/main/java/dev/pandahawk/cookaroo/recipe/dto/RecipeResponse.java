package dev.pandahawk.cookaroo.recipe.dto;

import dev.pandahawk.cookaroo.recipe.Difficulty;
import lombok.Builder;

import java.util.List;
@Builder
public record RecipeResponse(
    String id,
    String title,
    String description,
    Difficulty difficulty,
    List<String> ingredients,
    List<String> steps,
    int servings
) {
}
