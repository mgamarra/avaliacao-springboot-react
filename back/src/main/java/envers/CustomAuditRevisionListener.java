package envers;

import java.util.Optional;

import org.hibernate.envers.RevisionListener;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import avaliacao.model.BasicEntity;
import avaliacao.model.User;

public class CustomAuditRevisionListener implements RevisionListener {

    @Override
    public void newRevision(Object revisionEntity) {

        String currentUser = Optional.ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .filter(Authentication::isAuthenticated)
                .map(Authentication::getPrincipal)
                .map(User.class::cast)
                .map(User::getUsername)
                .orElse("Unknown-User");

        BasicEntity audit = (BasicEntity) revisionEntity;
        
        audit.setCreatedBy(currentUser);

    }
}