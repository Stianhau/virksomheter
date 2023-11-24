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

    private static VirksomhetOutputDto VirksomhetOutPutMap(Virksomhet virksomhet)
    {
        return new VirksomhetOutputDto
        {
            Adresse = virksomhet.Adresse,
            Epost = virksomhet.Epost,
            Id = virksomhet.Id,
            Navn = virksomhet.Navn,
            Organisasjonsnummer = virksomhet.Organisasjonsnummer,
            Telefon = virksomhet.Telefon
        };
    }


    [HttpGet]
    public async Task<ActionResult<ICollection<VirksomhetOutputDto>>> GetVirksomheter()
    {
        var virksomheter = await _context.Virksomheter.Include(v => v.Adresse).Select(virksomhet => VirksomhetOutPutMap(virksomhet))
        // new VirksomhetOutputDto
        // {
        //     Adresse = virksomhet.Adresse,
        //     Epost = virksomhet.Epost,
        //     Id = virksomhet.Id,
        //     Navn = virksomhet.Navn,
        //     Organisasjonsnummer = virksomhet.Organisasjonsnummer,
        //     Telefon = virksomhet.Telefon
        // })
        .ToListAsync();
        if (virksomheter is null) return NotFound();
        var l = virksomheter;
        return Ok(virksomheter);
    }

    [HttpPost]
    public async Task AddVirksomhet(VirksomhetInputDto virksomhet)
    {
        Adresse newAdresse = new Adresse()
        {
            Adresselinje_1 = virksomhet.Adresse.Adresselinje_1,
            Postnummer = virksomhet.Adresse.Postnummer,
            Poststed = virksomhet.Adresse.Poststed
        };

        Virksomhet newVirksomhet = new Virksomhet()
        {
            Organisasjonsnummer = virksomhet.Organisasjonsnummer,
            Adresse = newAdresse,
            Epost = virksomhet.Epost,
            Navn = virksomhet.Navn,
            Telefon = virksomhet.Telefon
        };
        await _context.Virksomheter.AddAsync(newVirksomhet);
        await _context.SaveChangesAsync();
    }

    [HttpPut]
    public async Task<ActionResult> UpdateVirksomhet(VirksomhetEditDto virksomhet)
    {
        var virksomhetToUpdate = await _context.Virksomheter.Include(v => v.Adresse).FirstOrDefaultAsync(v => v.Id == virksomhet.Id);
        if (virksomhetToUpdate is null) return NotFound("Virksomhet not found");

        virksomhetToUpdate.Navn = virksomhet.Navn;
        virksomhetToUpdate.Organisasjonsnummer = virksomhet.Organisasjonsnummer;
        virksomhetToUpdate.Telefon = virksomhet.Telefon;
        virksomhetToUpdate.Epost = virksomhet.Epost;
        virksomhetToUpdate.Adresse.Adresselinje_1 = virksomhet.Adresse.Adresselinje_1;
        virksomhetToUpdate.Adresse.Adresselinje_2 = virksomhet.Adresse.Adresselinje_2;
        virksomhetToUpdate.Adresse.Postnummer = virksomhet.Adresse.Postnummer;
        virksomhetToUpdate.Adresse.Poststed = virksomhet.Adresse.Poststed;
        await _context.SaveChangesAsync();

        return Ok();
    }
}
