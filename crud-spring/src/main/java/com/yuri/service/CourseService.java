package com.yuri.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuri.dto.CourseDTO;
import com.yuri.model.Course;
import com.yuri.repository.CourseRepository;

import jakarta.validation.Valid;

@Service
public class CourseService {
	
	@Autowired
	private CourseRepository repository;

	public List<CourseDTO> listAll() {

		return CourseDTO.converter(this.repository.findAll());
	}

	public void create(@Valid CourseDTO courseData) {
		Course course = new Course(courseData);
		this.repository.save(course);
	}

	public CourseDTO findById(Long id) {
		Course course = this.repository.findById(id).orElse(null);
		CourseDTO courseFound = new CourseDTO(course);
		return courseFound;
	}

	public CourseDTO update(@Valid CourseDTO course) {
		Course courseFound = this.repository.findById(course.id()).orElseThrow();
		courseFound.setCategory(course.category() == null ? courseFound.getCategory() : course.category());
		courseFound.setName(course.name() == null ? courseFound.getName() : course.name());
		
		CourseDTO courseUpdate = new CourseDTO(courseFound);
		
		return courseUpdate;
	}
	
	

}
