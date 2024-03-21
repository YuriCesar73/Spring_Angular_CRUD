package com.yuri.exception;

@SuppressWarnings("serial")
public class CourseNotFound extends RuntimeException{
	
	public CourseNotFound() {
		super("O curso não foi encontrado!");
	}

}
