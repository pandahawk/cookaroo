package dev.pandahawk.cookaroo.recipe;

import dev.pandahawk.cookaroo.recipe.dto.CreateRecipeRequest;
import dev.pandahawk.cookaroo.recipe.dto.RecipeResponse;
import dev.pandahawk.cookaroo.recipe.dto.RecipeSummaryResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RecipeMapper {
    @Mapping(target = "id", source = "publicId")
    RecipeSummaryResponse toRecipeSummaryResponse(Recipe recipe);

    @Mapping(target = "id", source = "publicId")
    RecipeResponse toRecipeResponse(Recipe recipe);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "publicId", source = "nanoId")
    Recipe toEntity(CreateRecipeRequest request, String nanoId);

    CreateRecipeRequest toCreateRequest(Recipe recipe);
}
