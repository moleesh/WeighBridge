package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Profile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileDAO extends CrudRepository<Profile, String> {

    Profile findFirstByMyPrimaryIsTrue();

}
