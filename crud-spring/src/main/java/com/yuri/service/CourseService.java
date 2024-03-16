package com.yuri.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuri.model.Course;
import com.yuri.repository.CourseRepository;

@Service
public class CourseService {
	
	@Autowired
	private CourseRepository repository;

	public List<Course> listAll() {

		return this.repository.findAll();
	}
	
	

}
