package dev.pandahawk.cookaroo.error.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Map;
@Builder
public record ErrorResponse(
        int status,
        String error,
        String message,
        Map<String, String> errors,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime timestamp
) {
    public ErrorResponse(int status, String error, String message,
                         Map<String, String> errors) {
        this(status, error, message, errors, LocalDateTime.now());
    }
}
