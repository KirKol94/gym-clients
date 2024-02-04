package ru.castroy10.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Table(name="appuser",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "appuser_username_key",
                        columnNames = "username"
                )
        })
@Data
public class Appuser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "middle_name")
    private String middleName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    @Column(name = "avatar")
    private String avatar;
    @Column(name = "account_nonexpired")
    private boolean accountNonExpired;
    @Column(name = "account_nonlocked")
    private boolean accountNonLocked;
    @Column(name = "credentials_nonexpired")
    private boolean credentialsNonExpired;
    @Column(name = "is_enabled")
    private boolean isEnabled;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "appuser_role", joinColumns = @JoinColumn(name = "appuser_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;
}
