package com.lingstar.lingstar.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Autowired
    private UserDetailService userDetails;

    @Bean
    public BCryptPasswordEncoder PasswordEncode() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetails).passwordEncoder(PasswordEncode());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests().antMatchers("/", "/auth/**", "/public/**", "/api/**", "/css/**","/js/**", "/img/**", "/webjars/**")
            .permitAll().anyRequest().authenticated()
        .and()
            .formLogin().loginPage("/auth/login").defaultSuccessUrl("/private/user/Dashboard", true) .failureUrl("/auth/login?error=true")
            .loginProcessingUrl("/auth/login-post").permitAll()
        .and()
            .logout().logoutUrl("/logout").deleteCookies("JSESSIONID").logoutSuccessUrl("/public/index").permitAll();
    }
}
