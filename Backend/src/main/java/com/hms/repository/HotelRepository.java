package com.hms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {


	Optional<Hotel> findByAdminEmail(String email);
	boolean existsByAdminEmail(String adminEmail);
}
