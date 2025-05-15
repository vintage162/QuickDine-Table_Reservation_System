package com.hms.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.model.Admin;
import com.hms.model.AuthResponse;
import com.hms.model.Hotel;
import com.hms.model.LoginRequest;
import com.hms.repository.AdminRepository;
import com.hms.repository.HotelRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
	
	
	@Autowired
	private AdminRepository adminRepo;
	@Autowired
	private HotelRepository hotelRepo;
	

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request){
		
		Optional<Admin> admin = adminRepo.findByEmail(request.getEmail());
		Optional<Hotel> hotel = hotelRepo.findByAdminEmail(request.getEmail());
		
		if(admin.isPresent()&& admin.get().getPassword().equals(request.getPassword())) {
			return ResponseEntity.ok(new AuthResponse("admin","Admin DashBoard"));
		}
		else if(hotel.isPresent() && hotel.get().getAdminPassword().equals(request.getPassword())) {
			return ResponseEntity.ok(new AuthResponse("hotel","hotel Dashboard"));
		}
		else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credential");
		}
		
	}
	
	
}
