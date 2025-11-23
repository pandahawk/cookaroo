package dev.pandahawk.cookaroo.recipe;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.pandahawk.cookaroo.recipe.dto.UpdateRecipeRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
class RecipeMapperTest {

    private List<Recipe> testRecipes;

    private final RecipeMapper mapper = Mappers.getMapper(RecipeMapper.class);


    @BeforeEach
    void setUp() throws IOException {
        testRecipes = loadRecipesFromJson();
    }

    private List<Recipe> loadRecipesFromJson() throws IOException {
        var om = new ObjectMapper();
        try (InputStream is = getClass().getResourceAsStream("/db/recipes.json")) {
            return om.readValue(is, new TypeReference<>() {
            });
        }
    }
    @Test
    void merge() {
        var old = testRecipes.getFirst();
        var req = UpdateRecipeRequest.builder()
                .title("updated")
                .steps(List.of("updated step 1", "updated step 2"))
                .description("udpated description")
                .build();

        var result = mapper.merge(old, req);

        assertThat(result.title()).isEqualTo(req.title());
        assertThat(result.description()).isEqualTo(req.description());
        assertThat(result.steps()).isEqualTo(req.steps());
        assertThat(result.publicId()).isEqualTo(old.publicId());
        assertThat(result.id()).isEqualTo(old.id());
        assertThat(result.difficulty()).isEqualTo(old.difficulty());
        assertThat(result.ingredients()).isEqualTo(old.ingredients());
        assertThat(result.servings()).isEqualTo(old.servings());

    }

    @Test
    void merge_noUpdate() {
        var old = testRecipes.getFirst();
        UpdateRecipeRequest req = null;

        var result = mapper.merge(old, req);

       assertThat(result).isEqualTo(old);

    }
}