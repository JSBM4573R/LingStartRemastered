package com.lingstar.lingstar.Security;

import com.lingstar.lingstar.Model.User;
import com.lingstar.lingstar.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User a = userRepo.findByEmail(email);
        UserBuilder builder = null;

        if(a != null) {
            builder = org.springframework.security.core.userdetails.User.withUsername(email);
            builder.disabled(false);
            builder.password(a.getPassword());
            builder.authorities(new SimpleGrantedAuthority("ROLE_USER"));
        }else{
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
        return builder.build();
    }
    
}
