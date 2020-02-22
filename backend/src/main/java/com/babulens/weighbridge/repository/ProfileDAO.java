package com.babulens.weighbridge.repository;

import com.babulens.weighbridge.model.entity.Profile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileDAO extends CrudRepository<Profile, String> {
	List<Profile> findByMyPrimaryIsTrue();
}
