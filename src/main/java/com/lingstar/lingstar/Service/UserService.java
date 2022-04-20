package com.lingstar.lingstar.Service;

import java.util.List;
import java.util.Optional;

import com.lingstar.lingstar.Model.User;
import com.lingstar.lingstar.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncode;

    public User getUser(Integer userId) {
        return userRepo.getUser(userId);
    }

    public List<User> ListUsers() {
        return userRepo.findAll();
    }

    public Boolean existEmail(String email) {
        return userRepo.existEmail(email);
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public User register(User user) {
        if (user.getId() == null) {
            if (existEmail(user.getEmail()) == false) {
                user.setPassword(passwordEncode.encode(user.getPassword()));
                return userRepo.save(user);
            } else {
                return user;
            }
        } else {
            return user;
        }
    }

    public User update(User user) {
        if (user.getId() != null) {
            if (existEmail(user.getEmail()) == true) {
                Optional<User> dbUser = userRepo.findById(user.getId());
                if(dbUser.get().getName() != null) {
                    dbUser.get().setName(user.getName());
                }
                if(dbUser.get().getLastName() != null) {
                    dbUser.get().setLastName(user.getLastName());
                }
                if(dbUser.get().getTel() != null) {
                    dbUser.get().setTel(user.getTel());
                }
                if(dbUser.get().getAge() != null) {
                    dbUser.get().setAge(user.getAge());
                }
                if(dbUser.get().getEmail() != null) {
                    dbUser.get().setEmail(user.getEmail());
                }
                if(dbUser.get().getPassword() != null) {
                    dbUser.get().setPassword(user.getPassword());
                }
                userRepo.save(user);
                return dbUser.get();
            } else {
                return user;
            }
        } else {
            return user;
        }
    }
}
