using DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class VirksomhetController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<VirksomhetController> _logger;

    private readonly ApplicationDbContext _context;

    public VirksomhetController(ILogger<VirksomhetController> logger, ApplicationDbContext context)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ICollection<Virksomhet>> GetVirksomheter()
    {
        return await _context.Virksomheter.Include(v => v.Adresse).ToListAsync();
    }

    [HttpPost]
    public async Task AddVirksomhet(VirksomhetInputDto virksomhet){
        Adresse newAdresse = new Adresse(){
            Adresselinje_1 = virksomhet.Adresse.Adresselinje_1,
            Postnummer = virksomhet.Adresse.Postnummer,
            Poststed = virksomhet.Adresse.Poststed
        };

        Virksomhet newVirksomhet = new Virksomhet() {
            Organisasjonsnummer = virksomhet.Organisasjonsnummer,
            Adresse = newAdresse,
            Epost = virksomhet.Epost,
            Navn = virksomhet.Navn,
            Telefon = virksomhet.Telefon
        };
        await _context.Virksomheter.AddAsync(newVirksomhet);
        await _context.SaveChangesAsync();
    }
}
