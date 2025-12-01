package dev.pandahawk.cookaroo.recipe;

import dev.pandahawk.cookaroo.recipe.dto.CreateRecipeRequest;
import dev.pandahawk.cookaroo.recipe.dto.RecipeResponse;
import dev.pandahawk.cookaroo.recipe.dto.UpdateRecipeRequest;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface RecipeMapper {

    @Mapping(target = "id", source = "publicId")
    RecipeResponse toRecipeResponse(Recipe recipe);

    @Mapping(target = "mongoId", ignore = true)
    @Mapping(target = "publicId", source = "nanoId")
    Recipe toEntity(String nanoId, CreateRecipeRequest request);

    default Recipe merge(Recipe old, UpdateRecipeRequest req) {
        if (req == null) return old;

        return Recipe.builder()
                .mongoId(old.mongoId())
                .publicId(old.publicId())
                .title(req.title() != null ? req.title() : old.title())
                .description(req.description() != null ? req.description() : old.description())
                .difficulty(req.difficulty() != null ? req.difficulty() : old.difficulty())
                .ingredients(req.ingredients() != null ? req.ingredients() : old.ingredients())
                .steps(req.steps() != null ? req.steps() : old.steps())
                .servings(req.servings() != null ? req.servings() : old.servings())
                .build();
    }
}
