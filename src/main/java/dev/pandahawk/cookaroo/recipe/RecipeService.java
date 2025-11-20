package dev.pandahawk.cookaroo.recipe;

import dev.pandahawk.cookaroo.recipe.dto.RecipeSummaryResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository repo;
    private final RecipeMapper mapper;

    public RecipeService(RecipeRepository repo, RecipeMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public List<RecipeSummaryResponse> listRecipes() {
        var recipes = repo.findAll();
        return recipes.stream().map(mapper::toRecipeSummaryResponse).toList();
    }
}
