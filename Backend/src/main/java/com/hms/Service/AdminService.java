package com.hms.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.model.Admin;
import com.hms.repository.AdminRepository;

@Service
public class AdminService {
	
	@Autowired
	private AdminRepository adminRepo;
	
//	public Admin login(String email,String password) {
//		Admin admin = adminRepo.findByEmail(email);
//	
//		if(admin != null && admin.getPassword().equals(password))
//		{
//			return admin;
//			
//		}
//		
//		
//		return null;
//	}
	
	

}
