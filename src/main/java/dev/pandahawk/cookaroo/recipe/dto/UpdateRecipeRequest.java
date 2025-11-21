package dev.pandahawk.cookaroo.recipe.dto;

import dev.pandahawk.cookaroo.recipe.Difficulty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.List;

@Builder
public record UpdateRecipeRequest(

        String title,
        String description,
        Difficulty difficulty,

        @Size(min = 1, message = "Ingredients must not be empty")
        List<@NotBlank(message = "Ingredient must not be blank") String> ingredients,

        // Same idea for steps
        @Size(min = 1, message = "Steps must not be empty")
        List<@NotBlank(message = "Step must not be blank") String> steps,

        @Min(value = 1, message = "Servings must be at least 1")
        Integer servings
) {
}
