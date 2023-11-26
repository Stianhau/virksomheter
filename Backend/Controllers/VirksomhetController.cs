using DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using client;
using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers;

[ApiController]
[Route("[controller]")]
public class VirksomheterController : ControllerBase
{
    private readonly ILogger<VirksomheterController> _logger;

    private readonly ApplicationDbContext _context;

    private readonly Client _brregClient;

    public VirksomheterController(ILogger<VirksomheterController> logger, ApplicationDbContext context)
    {
        _context = context;
        _logger = logger;
        var httpClient = new HttpClient();
        _brregClient = new Client(httpClient);
    }

    private async Task<ICollection<VirksomhetOutputDto>> virksomhetOutputDtos(List<Virksomhet> virksomheter)
    {
        var virksomheterOutputDto = new Collection<VirksomhetOutputDto>();

        foreach (var virksomhet in virksomheter)
        {
            bool? konkurs = null;
            bool? underAvvikling = null;
            try
            {
                var brregVirksomhet = await _brregClient.HentEnhetAsync(virksomhet.Organisasjonsnummer.ToString());
                konkurs = brregVirksomhet.Konkurs;
                underAvvikling = brregVirksomhet.UnderAvvikling;
            }
            catch (Exception)
            {
                _logger.LogError("Feil ved henting av virksomhet fra BRREG: {virksomhet.Organisasjonsnummer}", virksomhet.Organisasjonsnummer);
            }
            virksomheterOutputDto.Add(new VirksomhetOutputDto
            {
                Adresse = virksomhet.Adresse,
                Epost = virksomhet.Epost,
                Id = virksomhet.Id,
                Navn = virksomhet.Navn,
                Organisasjonsnummer = virksomhet.Organisasjonsnummer,
                Telefon = virksomhet.Telefon,
                Konkurs = konkurs,
                UnderAvvikling = underAvvikling
            });
        };

        return virksomheterOutputDto;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<ICollection<VirksomhetOutputDto>>> GetVirksomheter()
    {
        var dbVirksomheter = await _context.Virksomheter.Include(v => v.Adresse).ToListAsync();
        if (dbVirksomheter is null) return NotFound();

        var virksomheter = await virksomhetOutputDtos(dbVirksomheter);
        return Ok(virksomheter);
    }

    [Authorize]
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

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateVirksomhet(int id, VirksomhetEditDto virksomhet)
    {
        var virksomhetToUpdate = await _context.Virksomheter.Include(v => v.Adresse).FirstOrDefaultAsync(v => v.Id == id);
        if (virksomhetToUpdate is null) return NotFound("Virksomhet not found");

        virksomhetToUpdate.Navn = virksomhet.Navn;
        virksomhetToUpdate.Telefon = virksomhet.Telefon;
        virksomhetToUpdate.Epost = virksomhet.Epost;
        virksomhetToUpdate.Adresse.Adresselinje_1 = virksomhet.Adresse.Adresselinje_1;
        virksomhetToUpdate.Adresse.Adresselinje_2 = virksomhet.Adresse.Adresselinje_2;
        virksomhetToUpdate.Adresse.Postnummer = virksomhet.Adresse.Postnummer;
        virksomhetToUpdate.Adresse.Poststed = virksomhet.Adresse.Poststed;
        await _context.SaveChangesAsync();

        return Ok();
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteVirksomhet(int id)
    {
        var virksomhet = await _context.Virksomheter.FindAsync(id);
        if (virksomhet is null) return NotFound("Virksomhet not found");
        _context.Virksomheter.Remove(virksomhet);
        await _context.SaveChangesAsync();
        return Ok();
    }

}
