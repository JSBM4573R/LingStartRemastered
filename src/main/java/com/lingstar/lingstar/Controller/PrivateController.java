package com.lingstar.lingstar.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/private")
public class PrivateController {

    @GetMapping("/index")
    public String privateIndex() {
        return "private/index";
    }

    @GetMapping("/category")
    public String privateCategory() {
        return "private/category";
    }
    
}
