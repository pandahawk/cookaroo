package dev.pandahawk.cookaroo.recipe;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.pandahawk.cookaroo.error.domain.RecipeNotFoundException;
import dev.pandahawk.cookaroo.error.web.ErrorResponse;
import dev.pandahawk.cookaroo.recipe.dto.CreateRecipeRequest;
import dev.pandahawk.cookaroo.recipe.dto.RecipeResponse;
import dev.pandahawk.cookaroo.recipe.dto.UpdateRecipeRequest;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RecipeController.class)
@AutoConfigureMockMvc(addFilters = false)
class RecipeControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper mapper;

    @MockitoBean
    private RecipeService mockService;


    @Test
    void unexpectedExceptionReturns500ErrorResponse() throws Exception {
        var expectedErrResponse = ErrorResponse.builder()
                .errors(Collections.emptyMap())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .error(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
                .message("boom")
                .build();
        when(mockService.listRecipes()).thenThrow(new RuntimeException("boom"));

        mvc.perform(get("/api/v1/recipes"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.message").value(expectedErrResponse.message()))
                .andReturn();

        verify(mockService).listRecipes();
        verifyNoMoreInteractions(mockService);
    }


    @Nested
    class ListRecipes {
        @Test
        void success() throws Exception {
            var resp1 = RecipeResponse.builder()
                    .id("abcd1234")
                    .title("title 1")
                    .description("desc 1")
                    .difficulty(Difficulty.EASY)
                    .ingredients(List.of("A1", "A2"))
                    .steps(List.of("do a", "do b"))
                    .servings(2)
                    .build();
            var resp2 = RecipeResponse.builder()
                    .id("efgh5678")
                    .title("title 2")
                    .description("desc 2")
                    .difficulty(Difficulty.MEDIUM)
                    .ingredients(List.of("B1", "B2"))
                    .steps(List.of("do c", "do d"))
                    .servings(3)
                    .build();
            when(mockService.listRecipes()).thenReturn(List.of(resp1, resp2));

            mvc.perform(get("/api/v1/recipes"))
                    .andExpect(status().isOk())
                    .andExpect(content()
                            .json(mapper.writeValueAsString(
                                    List.of(resp1, resp2))));

            verify(mockService).listRecipes();
            verifyNoMoreInteractions(mockService);
        }
    }

    @Nested
    class GetRecipe {
        @Test
        void success() throws Exception {
            var response = RecipeResponse.builder()
                    .id("abcd1234")
                    .title("title 1")
                    .description("desc 1")
                    .difficulty(Difficulty.EASY)
                    .ingredients(List.of("A1", "A2"))
                    .steps(List.of("do a", "do b"))
                    .servings(2)
                    .build();
            var id = response.id();
            when(mockService.getRecipe(id)).thenReturn(response);

            mvc.perform(get("/api/v1/recipes/{id}", id))
                    .andExpect(status().isOk())
                    .andExpect(content().json(mapper.writeValueAsString(response)));

            verify(mockService).getRecipe(id);
            verifyNoMoreInteractions(mockService);
        }

        @Test
        void notFound() throws Exception {
            var id = "abcd1234";
            var ex = new RecipeNotFoundException(id);
            var response = ErrorResponse.builder()
                    .status(404)
                    .error(HttpStatus.NOT_FOUND.getReasonPhrase())
                    .message(ex.getMessage())
                    .errors(Collections.emptyMap())
                    .timestamp(LocalDateTime.now())
                    .build();
            when(mockService.getRecipe(id)).thenThrow(ex);

            mvc.perform(get("/api/v1/recipes/{id}", id))
                    .andExpect(status().isNotFound())
                    .andExpect(content().json(mapper.writeValueAsString(response)));

            verify(mockService).getRecipe(id);
            verifyNoMoreInteractions(mockService);
        }
    }

    @Nested
    class CreateRecipe {
        @Test
        void success() throws Exception {
            var req = CreateRecipeRequest.builder()
                    .title("title")
                    .description("desc")
                    .difficulty(Difficulty.EASY)
                    .ingredients(List.of("a", "b"))
                    .steps(List.of("do a", "do b"))
                    .servings(2)
                    .build();
            var resp = RecipeResponse.builder()
                    .id("abcd1234")
                    .title(req.title())
                    .description(req.description())
                    .difficulty(req.difficulty())
                    .ingredients(req.ingredients())
                    .steps(req.steps())
                    .servings(req.servings())
                    .build();
            var reqJson = mapper.writeValueAsString(req);
            when(mockService.createRecipe(req)).thenReturn(resp);

            mvc.perform(post("/api/v1/recipes")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(reqJson))
                    .andExpect(status().isCreated())
                    .andExpect(content().json(mapper.writeValueAsString(resp)));

            verify(mockService, times(1)).createRecipe(req);
        }

        @Test
        void numberTitle() throws Exception {
            var req = CreateRecipeRequest.builder()
                    .title("2")
                    .description("desc")
                    .difficulty(Difficulty.EASY)
                    .ingredients(List.of("a", "b"))
                    .steps(List.of("do a", "do b"))
                    .servings(2)
                    .build();
            var reqJson = mapper.writeValueAsString(req);

            mvc.perform(post("/api/v1/recipes")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(reqJson))
                    .andExpect(status().isBadRequest())
                    .andExpect(jsonPath("$.message").value("Invalid input"))
                    .andExpect(jsonPath("$.errors.title").value("must not be a number"));

            verify(mockService, times(0)).createRecipe(req);
        }
    }

    @Nested
    class DeleteRecipe {

        @Test
        void success() throws Exception {
            var id = "1234abcd";
            doNothing().when(mockService).deleteRecipe(id);

            mvc.perform(delete("/api/v1/recipes/{id}", id))
                    .andExpect(status().isNoContent());
        }

        @Test
        void notFound() throws Exception {
            var id = "notfound";
            doThrow(new RecipeNotFoundException(id))
                    .when(mockService).deleteRecipe(id);

            mvc.perform(delete("/api/v1/recipes/{id}", id))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.message").value("Recipe not found " +
                            "with mongoId: " + id));
        }
    }

    @Nested
    class UpdateRecipe {
        @Test
        void success() throws Exception {
            var old = mock(Recipe.class);
            var id = "abcd1234";
            var req = UpdateRecipeRequest.builder()
                    .title("new title")
                    .difficulty(Difficulty.MEDIUM)
                    .build();
            var res = RecipeResponse.builder()
                    .title(req.title())
                    .difficulty(req.difficulty())
                    .servings(old.servings())
                    .steps(old.steps())
                    .ingredients(old.ingredients())
                    .id(id)
                    .description(old.description())
                    .build();
            when(mockService.updateRecipe(id, req)).thenReturn(res);

            mvc.perform(patch("/api/v1/recipes/{id}", id)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(mapper.writeValueAsString(req)))
                    .andExpect(status().isOk())
                    .andExpect(content().json(mapper.writeValueAsString(res)));

            verify(mockService, times(1)).updateRecipe(id, req);
        }
    }


}