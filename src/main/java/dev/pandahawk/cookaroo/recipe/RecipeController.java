package dev.pandahawk.cookaroo.recipe;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recipes")
@Tag(name = "Recipes", description = "Operations on cooking recipes")
public class RecipeController {

    @GetMapping
    @Operation(summary = "list recipes", description = "returns all recipes")
    public List<RecipeSummaryResponse> listRecipes() {
        return null;
    }
}

