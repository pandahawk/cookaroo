package dev.pandahawk.cookaroo.recipe;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RecipeServiceTest {

    private RecipeService service;
    private RecipeMapper mapper;
    @Mock
    private RecipeRepository mockRepo;
    private List<Recipe> testRecipes;

    @BeforeEach
    void setUp() throws IOException {
        mapper = Mappers.getMapper(RecipeMapper.class);
        service = new RecipeService(mockRepo, mapper);
        testRecipes = loadRecipesFromJson();
    }

    @Nested
    class ListRecipes {
        @Test
        void success() {
            var r1 = testRecipes.get(0);
            var r2 = testRecipes .get(1);
            var r1res = mapper.toRecipeSummaryResponse(r1);
            var r2res = mapper.toRecipeSummaryResponse(r2);
            when(mockRepo.findAll()).thenReturn(List.of(r1, r2));

            var result = service.listRecipes();

            assertThat(result)
                    .hasSize(2)
                    .containsExactly(r1res, r2res);
        }

        @Test
        void dbFailure() {
            when(mockRepo.findAll()).thenThrow(new RuntimeException(
                    "simulated db failure"));

            assertThrows(RuntimeException.class, ()-> service.listRecipes());
        }
    }

    private List<Recipe> loadRecipesFromJson() throws IOException {
        var om = new ObjectMapper();
        try (InputStream is = getClass().getResourceAsStream("/db/recipes.json")) {
            return om.readValue(is, new TypeReference<List<Recipe>>() {});
        }
    }
  
}