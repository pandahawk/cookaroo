package dev.pandahawk.cookaroo.recipe.dto;

import dev.pandahawk.cookaroo.recipe.Difficulty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreateRecipeRequest(

        @NotBlank(message = "Title must not be empty")
        String title,

        @NotBlank(message = "Title must not be empty")
        String description
        ,
        @NotNull(message = "Difficulty is required")
        Difficulty difficulty,

        @NotEmpty(message = "Ingredients must not be empty")
        List<@NotBlank(message = "Ingredient must not be blank") String> ingredients,

        @NotEmpty(message = "Steps must not be empty")
        List<@NotBlank(message = "Step must not be blank") String> steps,

        @Min(value = 1, message = "Servings must be at least 1")
        int servings
) {
}
