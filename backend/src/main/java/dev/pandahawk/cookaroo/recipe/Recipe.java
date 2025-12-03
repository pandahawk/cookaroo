package dev.pandahawk.cookaroo.recipe;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Set;

@Document("recipes")
@Builder
public record Recipe(
        @Id
        String mongoId,
        @Indexed(unique = true)
        String publicId,
        String title,
        String description,
        Difficulty difficulty,
        Set<Category> categories,
        List<String> ingredients,
        List<String> steps,
        int servings
) {
}
