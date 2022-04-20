package com.lingstar.lingstar.Repository.Crud;

import java.util.Optional;

import com.lingstar.lingstar.Model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCrudRepository extends JpaRepository<User, Integer> {
    public User findByEmail(String email);
    public User findByName(String name);
    Optional<User> findById(Integer userId);
}
