package avaliacao.model;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
  ROLE_ADMIN, ROLE_CLIENT, ROLE_COMUM;

  public String getAuthority() {
    return name();
  }

}
