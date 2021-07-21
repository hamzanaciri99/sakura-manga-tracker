package com.mangatracker.Model;

public class Response {

  public static final Response ERROR = new Response("ERROR");
  public static final Response SUCCESS = new Response("SUCCESS");

  private String status;

  public void setStatus(String status) {
    this.status = status;
  }

  public String getStatus() {
    return status;
  }

  public Response(String status) {
    this.status = status;
  }

  public Response() { }
}