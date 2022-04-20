package com.lingstar.lingstar.Repository;

import java.util.List;
import java.util.Optional;

import com.lingstar.lingstar.Model.User;
import com.lingstar.lingstar.Repository.Crud.IUserCrudRepository;
import com.lingstar.lingstar.Repository.Crud.UserCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository implements IUserCrudRepository {

    @Autowired
    private UserCrudRepository userCrudRepo;

    public List<User> findAll() {
        return (List<User>) userCrudRepo.findAll();
    }

    public User getUser(Integer userId) {
        return userCrudRepo.getById(userId);
    }

    public Optional<User> findById(Integer userId) {
        return userCrudRepo.findById(userId);
    }

    public Boolean existEmail(String email) {
        User userEmail = userCrudRepo.findByEmail(email);
        if(userEmail == null) {
            return false;
        } else {
            return true;
        }
    }

    public User save(User user) {
        return userCrudRepo.save(user);
    }

    public User update(User user) {
        return userCrudRepo.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userCrudRepo.findByEmail(email);
    }

    @Override
    public User findByName(String name) {
        return userCrudRepo.findByName(name);
    }


}
