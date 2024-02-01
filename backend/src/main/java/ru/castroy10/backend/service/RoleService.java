package ru.castroy10.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.castroy10.backend.model.Role;
import ru.castroy10.backend.repository.RoleRepository;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public void save(Role role){
        roleRepository.save(role);
    }

    public Role findByRoleName(String roleName){
        return roleRepository.findByRoleName(roleName).orElse(new Role());
    }
}
