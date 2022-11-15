using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using server.Models;

namespace server.Data
{
    public static class ApplicationDbInitializer
    {
        public static void Initialize(ApplicationDbContext db, UserManager<ApplicationUser> um)
        {
            // Development
            // Use EnsureDeleted when changing models.
            // Might be errors if not using incognito mode
            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();
            
            // Test user
            var user = new ApplicationUser {UserName = "user@uia.no", Email = "user@uia.no", Ip = "10.0.0.114", Port = "11000" };
            um.CreateAsync(user, "Password1.").Wait();
            db.SaveChanges();
        }
    }
}