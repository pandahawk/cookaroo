package dev.pandahawk.cookaroo.recipe;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.pandahawk.cookaroo.error.web.ErrorResponse;
import dev.pandahawk.cookaroo.recipe.dto.RecipeResponse;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        var expectedError = ErrorResponse.builder()
                .errors(Collections.emptyMap())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .error(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
                .message("boom")
                .timestamp(LocalDateTime.now())
                .build();
        when(mockService.listRecipes()).thenThrow(new RuntimeException("boom"));

        var mvcResult =
                mvc.perform(get("/api/v1/recipes"))
                        .andExpect(status().isInternalServerError())
                        .andReturn();

        var json = mvcResult.getResponse().getContentAsString();
        var result = mapper.readValue(json, ErrorResponse.class);

        assertThat(result)
                .usingRecursiveComparison()
                .ignoringFields("timestamp")
                .isEqualTo(expectedError);

        verify(mockService).listRecipes();
        verifyNoMoreInteractions(mockService);
    }


    @Nested
    class listRecipes {
        @Test
        void success() throws Exception {
            var resp1 = RecipeResponse.builder()
                    .id("mongo1")
                    .title("title 1")
                    .description("desc 1")
                    .difficulty(Difficulty.EASY)
                    .ingredients(List.of("A1", "A2"))
                    .steps(List.of("do a", "do b"))
                    .servings(2)
                    .build();
            var resp2 = RecipeResponse.builder()
                    .id("mongo2")
                    .title("title 2")
                    .description("desc 2")
                    .difficulty(Difficulty.MEDIUM)
                    .ingredients(List.of("B1", "B2"))
                    .steps(List.of("do c", "do d"))
                    .servings(3)
                    .build();
            when(mockService.listRecipes()).thenReturn(List.of(resp1, resp2));

            var mvcResult = mvc.perform(get("/api/v1/recipes"))
                    .andExpect(status().isOk()).andReturn();

            var json = mvcResult.getResponse().getContentAsString();
            var result = mapper.readValue(
                    json, new TypeReference<List<RecipeResponse>>() {
                    });

            assertThat(result)
                    .hasSize(2)
                    .containsExactly(resp1, resp2);

            verify(mockService).listRecipes();
            verifyNoMoreInteractions(mockService);
        }


    }
}