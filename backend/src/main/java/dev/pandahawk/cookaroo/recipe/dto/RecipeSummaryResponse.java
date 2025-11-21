package dev.pandahawk.cookaroo.recipe.dto;

import dev.pandahawk.cookaroo.recipe.Difficulty;

public record RecipeSummaryResponse(
        String id,
        String title,
        String description,
        Difficulty difficulty
) {}
