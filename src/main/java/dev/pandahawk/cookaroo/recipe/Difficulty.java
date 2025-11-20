package dev.pandahawk.cookaroo.recipe;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Difficulty {
    EASY, MEDIUM, HARD;

    @JsonCreator
    public static Difficulty from(String value) {
        return Difficulty.valueOf(value.toUpperCase());
    }
}
