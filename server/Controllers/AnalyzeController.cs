using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    public class AnalyzeController : Controller
    {
        private readonly ApplicationDbContext _db;

        public AnalyzeController(ApplicationDbContext db)
        {
            _db = db;
        }
        
        public async Task<IActionResult> Table()
        {
            return View(await _db.LiveData.ToListAsync());
        }
        
        public IActionResult Chart()
        {
            return View();
        }

        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}