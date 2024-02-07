package ru.castroy10.backend.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.castroy10.backend.model.Appuser;
import ru.castroy10.backend.model.Role;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class AppUserDetails implements UserDetails {

    private final Appuser appuser;

    public AppUserDetails(Appuser appuser) {
        this.appuser = appuser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        if (appuser.getRoles() != null) {
            for (Role role : appuser.getRoles()) {
                grantedAuthorities.add(new SimpleGrantedAuthority(role.getRoleName()));
            }
        }
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return this.appuser.getPassword();
    }

    @Override
    public String getUsername() {
        return this.appuser.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.appuser.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.appuser.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.appuser.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return this.appuser.isEnabled();
    }
}
