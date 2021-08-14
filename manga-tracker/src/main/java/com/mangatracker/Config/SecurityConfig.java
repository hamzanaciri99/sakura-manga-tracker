package com.mangatracker.Config;

import javax.servlet.http.HttpServletResponse;

import com.mangatracker.Model.User;
import com.mangatracker.jwt.JwtTokenFilter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private static final Logger LOG = LoggerFactory.getLogger(SecurityConfig.class);

  @Autowired
  private JwtTokenFilter jwtTokenFilter;


  @Override @Bean
  public AuthenticationManager authenticationManagerBean() throws Exception {
      return super.authenticationManagerBean();
  }

  @LoadBalanced
  @Bean
  RestTemplate restTemplate() {
    return new RestTemplate();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // Enable CORS and disable CSRF
    http = http.cors().and().csrf().disable();

    // Set session management to stateless
    http = http
      .sessionManagement()
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and();
      
    http = http.exceptionHandling().authenticationEntryPoint((req, res, ex) -> {
      res.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
    }).and();

    http.authorizeRequests()
      // public endpoint
      .antMatchers("/user/login").permitAll()
      .antMatchers("/user/signup").permitAll()
      .antMatchers("/actuator/**").permitAll()
      // everything else is private
      .anyRequest().authenticated();

    // Add JWT token filter
    http.addFilterBefore(
      jwtTokenFilter,
      UsernamePasswordAuthenticationFilter.class
    );
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    // TODO Auto-generated method stub
    auth.userDetailsService(username -> new UserDetailsImp(
        restTemplate().getForEntity("http://user-service/user/get/u/" + username, User.class).getBody()
      ));
  }

  @Bean
  public PasswordEncoder passwordEncoder() { return NoOpPasswordEncoder.getInstance(); }
  
}
