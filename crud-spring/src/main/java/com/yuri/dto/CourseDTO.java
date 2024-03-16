package com.yuri.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

public record CourseDTO(@JsonAlias("_id") Long id, String name, String category) {

}
