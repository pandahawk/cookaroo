package dev.pandahawk.cookaroo.error.domain;

public class RecipeNotFoundException extends NotFoundException {
    public RecipeNotFoundException(String id) {
        super("Recipe not found with id: " + id );
    }
}
