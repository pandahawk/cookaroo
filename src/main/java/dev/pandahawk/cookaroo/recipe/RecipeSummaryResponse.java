package dev.pandahawk.cookaroo.recipe;

@SuppressWarnings("java:S2094")
public record RecipeSummaryResponse(
        String id,
        String title,
        String description
) {}
