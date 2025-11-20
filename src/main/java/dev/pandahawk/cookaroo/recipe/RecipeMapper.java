package dev.pandahawk.cookaroo.recipe;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RecipeMapper {
    RecipeMapper INSTANCE = Mappers.getMapper(RecipeMapper.class);
    @Mapping(target = "id", source = "publicId")
    RecipeSummaryResponse recipeToRecipeSummaryResponse(Recipe recipe);
}
