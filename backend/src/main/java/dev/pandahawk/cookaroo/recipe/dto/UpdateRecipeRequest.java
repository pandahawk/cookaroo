package dev.pandahawk.cookaroo.recipe.dto;

import dev.pandahawk.cookaroo.recipe.Category;
import dev.pandahawk.cookaroo.recipe.Difficulty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.List;
import java.util.Set;

@Builder
public record UpdateRecipeRequest(
        String title,
        String description,
        Difficulty difficulty,

        @Size(min = 1)
        List<@NotBlank String> ingredients,

        // Same idea for steps
        @Size(min = 1)
        List<@NotBlank String> steps,

        @Min(value = 1)
        Integer servings,

        @Size(min = 1)                 // ✅ applied ONLY if set is not null
        Set<@NotNull Category> category
) {}
