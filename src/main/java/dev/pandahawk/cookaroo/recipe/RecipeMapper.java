package dev.pandahawk.cookaroo.recipe;

import dev.pandahawk.cookaroo.recipe.dto.RecipeSummaryResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface RecipeMapper {
    RecipeMapper INSTANCE = Mappers.getMapper(RecipeMapper.class);
    @Mapping(target = "id", source = "publicId")
    RecipeSummaryResponse toRecipeSummaryResponse(Recipe recipe);
}
