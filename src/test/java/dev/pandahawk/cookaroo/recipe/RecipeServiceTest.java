package dev.pandahawk.cookaroo.recipe;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.pandahawk.cookaroo.core.id.NanoIdService;
import dev.pandahawk.cookaroo.error.domain.RecipeNotFoundException;
import dev.pandahawk.cookaroo.recipe.dto.CreateRecipeRequest;
import dev.pandahawk.cookaroo.recipe.dto.RecipeResponse;
import dev.pandahawk.cookaroo.recipe.dto.RecipeSummaryResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RecipeServiceTest {


    @Mock
    private RecipeMapper mockMapper;
    @Mock
    private RecipeRepository mockRepo;
    @Mock
    private NanoIdService mockIdService;

    private List<Recipe> testRecipes;

    @InjectMocks
    private RecipeService service;

    @BeforeEach
    void setUp() throws IOException {
        testRecipes = loadRecipesFromJson();
    }

    private List<Recipe> loadRecipesFromJson() throws IOException {
        var om = new ObjectMapper();
        try (InputStream is = getClass().getResourceAsStream("/db/recipes.json")) {
            return om.readValue(is, new TypeReference<List<Recipe>>() {
            });
        }
    }

    @Nested
    class ListRecipes {
        @Test
        void success() {
            var r1 = testRecipes.getFirst();
            var r2 = testRecipes.getLast();
            var r1res = mock(RecipeSummaryResponse.class);
            var r2res = mock(RecipeSummaryResponse.class);
            when(mockMapper.toRecipeSummaryResponse(r1)).thenReturn(r1res);
            when(mockMapper.toRecipeSummaryResponse(r2)).thenReturn(r2res);
            when(mockRepo.findAll()).thenReturn(List.of(r1, r2));

            var result = service.listRecipes();

            assertThat(result)
                    .hasSize(2)
                    .containsExactly(r1res, r2res);

            verify(mockRepo).findAll();
            verify(mockMapper).toRecipeSummaryResponse(r1);
            verify(mockMapper).toRecipeSummaryResponse(r2);
            verifyNoMoreInteractions(mockRepo, mockMapper);
        }
    }

    @Nested
    class getRecipe {
        @Test
        void success() {
            var id = "abcd1234";
            var r = mock(Recipe.class);
            var rResp = mock(RecipeResponse.class);
            when(mockRepo.findByPublicId(id)).thenReturn(Optional.of(r));
            when(mockMapper.toRecipeResponse(r)).thenReturn(rResp);

            var result = service.getRecipe(id);

            assertThat(result).isEqualTo(rResp);
            verify(mockRepo).findByPublicId(id);
            verify(mockMapper).toRecipeResponse(r);
            verifyNoMoreInteractions(mockRepo, mockMapper);
        }

        @Test
        void notFound() {
            var id = "notfound";
            when(mockRepo.findByPublicId(anyString())).thenReturn(Optional.empty());

            assertThrows(RecipeNotFoundException.class,
                    () -> service.getRecipe(id));
            verify(mockRepo).findByPublicId(id);
            verifyNoMoreInteractions(mockRepo, mockMapper);
        }
    }

    @Nested
    class deleteRecipe {

        @Test
        void success() {
            var r = testRecipes.getFirst();
            var id = r.publicId();
            when(mockRepo.findByPublicId(id)).thenReturn(Optional.of(r));

            service.deleteRecipe(id);

            verify(mockRepo).findByPublicId(id);
            verify(mockRepo).delete(r);
            verifyNoMoreInteractions(mockRepo, mockMapper);
        }

        @Test
        void notFound() {
            var id = "someid";
            when(mockRepo.findByPublicId(id)).thenReturn(Optional.empty());

            assertThrows(RecipeNotFoundException.class,
                    () -> service.deleteRecipe(id));

            verifyNoMoreInteractions(mockMapper, mockRepo);
        }
    }

    @Nested
    class createRecipe {
        @Test
        void success() {
            var rSaved = testRecipes.getFirst();
            var r = testRecipes.getFirst();
            var req = mock(CreateRecipeRequest.class);
            var res = mock(RecipeResponse.class);
            when(mockMapper.toEntity(eq(req), anyString())).thenReturn(r);
            when(mockRepo.save(r)).thenReturn(rSaved);
            when(mockMapper.toRecipeResponse(rSaved)).thenReturn(res);
            when(mockIdService.generateId()).thenReturn("abcd1234");

            var result = service.createRecipe(req);

            assertThat(result).isSameAs(res);
            verify(mockMapper).toEntity(req, "abcd1234");
            verify(mockRepo).save(r);
            verify(mockMapper).toRecipeResponse(rSaved);
            verify(mockIdService).generateId();
            verifyNoMoreInteractions(mockRepo, mockMapper, mockIdService);
        }
    }
}