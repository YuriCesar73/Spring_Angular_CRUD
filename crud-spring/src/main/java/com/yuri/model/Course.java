package com.yuri.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.yuri.dto.CourseDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.Valid;

@Entity
public class Course {
	
	@Id()
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonAlias("_id")
	private Long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false, length = 30)
	private String category;
	
	
	public Course() {
		
	}
	
	public Course(Long id, String name, String category) {
		this.id = id;
		this.name = name;
		this.category = category;
	}

	public Course(@Valid CourseDTO courseData) {
		this.id = courseData.id();
		this.name = courseData.name();
		this.category = courseData.category();
		}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Override
	public int hashCode() {
		return Objects.hash(category, id, name);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Course other = (Course) obj;
		return Objects.equals(category, other.category) && Objects.equals(id, other.id)
				&& Objects.equals(name, other.name);
	}
}
