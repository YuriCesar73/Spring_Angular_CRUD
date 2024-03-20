package com.yuri.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yuri.dto.CourseDTO;
import com.yuri.model.Course;
import com.yuri.service.CourseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin()
public class CourseController {
	
	@Autowired
	private CourseService service;
	
	@GetMapping
	@ResponseStatus(code = HttpStatus.OK)
	public List<Course> list(){
		List<Course> courses =  this.service.listAll();
		return courses;
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(code = HttpStatus.OK)
	public ResponseEntity<Course> findById(@PathVariable("id") Long id){
		Course course = this.service.findById(id);
		return ResponseEntity.status(HttpStatus.FOUND).body(course);
	}
	
	
	@PostMapping
	public ResponseEntity<CourseDTO> create(@Valid @RequestBody CourseDTO course) {
		this.service.create(course);
		return ResponseEntity.status(HttpStatus.CREATED).body(course);
		
	}

}
