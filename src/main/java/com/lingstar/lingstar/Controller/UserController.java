package com.lingstar.lingstar.Controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.lingstar.lingstar.Model.User;
import com.lingstar.lingstar.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<User> ListUsers() {
        return userService.ListUsers();
    }

    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public User getUser(@PathVariable("userId") Integer userId) {
        return userService.getUser(userId);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user){
        return userService.update(user);
    }

    @GetMapping("/username")
    @ResponseStatus(HttpStatus.OK)
    public User username(Authentication auth, HttpSession session) {
        User user = userService.findByEmail(auth.getName());
        if(user == null) {
            return new User();
            // throw new RuntimeException("Unknown username [" + auth.getName() + "]");
        } else {
            if(session.getAttribute("user") == null) {  
                session.setAttribute("user", user);
            }
            user.setPassword("");
            return user;
        }
    }

}
