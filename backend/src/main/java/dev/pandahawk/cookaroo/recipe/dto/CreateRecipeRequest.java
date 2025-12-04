package dev.pandahawk.cookaroo.recipe.dto;

import dev.pandahawk.cookaroo.recipe.Category;
import dev.pandahawk.cookaroo.recipe.Difficulty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Builder;

import java.util.List;
import java.util.Set;

@Builder
public record CreateRecipeRequest(

        @NotBlank
        @Pattern(regexp = "^(?!\\d+$).*$", message = "must not be a number")
        @Schema(example = "string")
        String title,

        @NotBlank
        String description
        ,
        @NotNull
        Difficulty difficulty,

        @NotEmpty
        Set<@NotNull Category> category,

        @NotEmpty
        List<@NotBlank String> ingredients,

        @NotEmpty
        List<@NotBlank String> steps,

        @Min(value = 1)
        int servings
) {
}
