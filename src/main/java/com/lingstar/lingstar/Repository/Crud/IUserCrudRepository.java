package com.lingstar.lingstar.Repository.Crud;

import com.lingstar.lingstar.Model.User;

public interface IUserCrudRepository {
    public User findByEmail(String email);
    public User findByName(String name);
    
}
