package com.lingstar.lingstar.Controller;


import com.lingstar.lingstar.Model.User;
import com.lingstar.lingstar.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserLoginController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/auth/login")
    public String login(Model model) {
        model.addAttribute("user", new User());
        return "login";
    }

    @GetMapping("/auth/register")
    public String registerForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/auth/register")
    public String registerUser(@ModelAttribute User user, Model model, BindingResult result) {
        if(result.hasErrors()) {
            return "redirect:/auth/register";
        } else {
            model.addAttribute("usuario", userService.register(user));
        }
        return "redirect:/auth/login";
    }
}
