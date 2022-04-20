package com.lingstar.lingstar.Model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * @author JSBM
 */
@Entity
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "user_name", nullable = false, length = 45)
    private String name;
    @Column(name = "user_lastName", nullable = false, length = 45)
    private String lastName;
    @Column(name = "user_tel", nullable = false, length = 45)
    private String tel;
    @Column(name = "user_age", nullable = false, length = 12)
    private String age;
    @Column(name = "user_email", nullable = false, length = 3)
    private String email;
    @Column(name = "user_password", nullable = false, length = 60)
    private String password;
}
