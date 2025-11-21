package dev.pandahawk.cookaroo.recipe;

import dev.pandahawk.cookaroo.recipe.dto.CreateRecipeRequest;
import dev.pandahawk.cookaroo.recipe.dto.RecipeResponse;
import dev.pandahawk.cookaroo.recipe.dto.RecipeSummaryResponse;
import dev.pandahawk.cookaroo.recipe.dto.UpdateRecipeRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recipes")
@Tag(name = "Recipes", description = "Operations on cooking recipes")
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "List recipes", description = "Lists all recipes.")
    public List<RecipeSummaryResponse> listRecipes() {
        return service.listRecipes();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get recipe", description = "Returns the " +
            "recipe with the given ID.")
    public RecipeResponse getRecipe(
            @Parameter(name = "id", description = "Nano id of the recipe")
            @PathVariable String id) {
        return service.getRecipe(id);
    }

    @PostMapping
    @Operation(summary = "Create new recipe", description = "Creates a new " +
            "recipe.")
    @ApiResponse(responseCode = "201", description = "Recipe created")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @ResponseStatus(HttpStatus.CREATED)
    public RecipeResponse createRecipe(
            @Valid @RequestBody CreateRecipeRequest request) {
        return service.createRecipe(request);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete recipe", description = "Deletes the recipe " +
            "with the given id.")
    @ApiResponse(responseCode = "204", description = "Recipe deleted")
    @ApiResponse(responseCode = "404", description = "Recipe not found")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecipe(
            @Parameter(name = "id", description = "Nano id of the recipe")
            @PathVariable String id) {
        service.deleteRecipe(id);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Update recipe", description = "Updates the recipe " +
            "with the given id.")
    public RecipeResponse updateRecipe(
            @Parameter(name = "id", description = "Nano id of the recipe")
            @PathVariable String id,
            @Valid @RequestBody UpdateRecipeRequest request) {
        return service.updateRecipe(id, request);
    }





}

