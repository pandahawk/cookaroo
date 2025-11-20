package dev.pandahawk.cookaroo.recipe.dto;

import dev.pandahawk.cookaroo.recipe.Difficulty;

import java.util.List;

public record CreateRecipeRequest(
        String title,
        String description,
        Difficulty difficulty,
        List<String> ingredients,
        List<String> steps,
        int servings
) {
}
