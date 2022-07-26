package com.example.demo.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

import static com.example.demo.student.GenderEnum.FEMALE;
import static com.example.demo.student.GenderEnum.MALE;

@RestController
@RequestMapping(path = "api/v1/students")
public class StudentController {
    @GetMapping
    public List<Student> getAllStudents(){
        List<Student>students = Arrays.asList(
                new Student(1L, "Luis Guzmán", "lguzman@fvecuador.com", MALE),
                new Student(2L, "María Tev", "mtev@fvecuador.com", FEMALE)
        );
        return students;
    }
}
