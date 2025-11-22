package dev.pandahawk.cookaroo.recipe;

import dev.pandahawk.cookaroo.core.id.NanoIdService;
import dev.pandahawk.cookaroo.error.domain.RecipeNotFoundException;
import dev.pandahawk.cookaroo.recipe.dto.CreateRecipeRequest;
import dev.pandahawk.cookaroo.recipe.dto.RecipeResponse;
import dev.pandahawk.cookaroo.recipe.dto.UpdateRecipeRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository repo;
    private final RecipeMapper mapper;
    private final NanoIdService idService;

    public RecipeService(RecipeRepository repo, RecipeMapper mapper, NanoIdService idService) {
        this.repo = repo;
        this.mapper = mapper;
        this.idService = idService;
    }

    public List<RecipeResponse> listRecipes() {
        return repo.findAll()
                .stream()
                .map(mapper::toRecipeResponse)
                .toList();
    }

    public RecipeResponse getRecipe(String id) {
        return repo.findByPublicId(id)
                .map(mapper::toRecipeResponse)
                .orElseThrow(() -> new RecipeNotFoundException(id));

    }

    public void deleteRecipe(String id) {
        var r = repo.findByPublicId(id).orElseThrow(() -> new RecipeNotFoundException(id));
        repo.delete(r);
    }

    public RecipeResponse createRecipe(CreateRecipeRequest request) {
        var r = mapper.toEntity(idService.generateId(), request);
        var saved = repo.save(r);
        return mapper.toRecipeResponse(saved);
    }

    public RecipeResponse updateRecipe(String id, UpdateRecipeRequest request) {
        var r = repo.findByPublicId(id)
                .orElseThrow(() -> new RecipeNotFoundException(id));
        var updated = mapper.merge(r, request);
        var saved = repo.save(updated);
        return mapper.toRecipeResponse(saved);
    }
}
