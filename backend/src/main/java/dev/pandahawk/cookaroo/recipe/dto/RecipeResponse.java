package dev.pandahawk.cookaroo.recipe.dto;

import dev.pandahawk.cookaroo.recipe.Difficulty;

import java.util.List;

@SuppressWarnings("java:S2094")
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
