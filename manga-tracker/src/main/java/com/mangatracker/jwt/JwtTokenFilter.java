package com.mangatracker.jwt;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

  public static final String JWT_HEADER = "jwt";

  @Autowired
  JwtUtil jwtUtil;

  private static final Logger LOG = LoggerFactory.getLogger(JwtTokenFilter.class);

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    // TODO Auto-generated method stub
    final String token = request.getHeader(JWT_HEADER);

    LOG.info("token: " + token);

    if(token == null || token.equals("") || !jwtUtil.verifyJwtToken(token)) {
      filterChain.doFilter(request, response);
      return;
    }

    UsernamePasswordAuthenticationToken 
      authentication = new UsernamePasswordAuthenticationToken(jwtUtil.getUsername(token), null, List.of());

    SecurityContextHolder.getContext().setAuthentication(authentication);
    filterChain.doFilter(request, response);
  }
  
}
