package dev.pandahawk.cookaroo.recipe;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("recipes")
@Builder
public record Recipe(
        @Id
        String id,
        @Indexed(unique = true)
        String publicId,
        String title,
        String description,
        Difficulty difficulty,
        List<String> ingredients,
        List<String> steps,
        int servings
) {
}
