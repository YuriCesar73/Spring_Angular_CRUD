package com.yuri.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yuri.model.Course;

public record CourseDTO(@JsonProperty("_id") Long id, String name, String category) {

	public CourseDTO(Course course) {
		this(course.getId(), course.getName(), course.getCategory());
	}
	
	public static List<CourseDTO> converter(List<Course> courses){
		return courses.stream().map(CourseDTO::new).collect(Collectors.toList());
	}
}
